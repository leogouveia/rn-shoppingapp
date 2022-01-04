import React, { useLayoutEffect } from "react";
import { Alert, Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import HeaderDrawerButton from "../../components/UI/HeaderDrawerButton";
import HeaderEditProductButton from "../../components/UI/HeaderEditProductButton";
import colors from "../../constants/colors";
import { deleteProduct } from "../../store/actions/products";

const UserProducts = ({ navigation }) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Your Products",
      headerLeft: () => (
        <HeaderDrawerButton onPress={() => navigation.toggleDrawer()} />
      ),
      headerRight: () => (
        <HeaderEditProductButton
          onPress={() =>
            navigation.navigate("EditProduct", { productId: null })
          }
        />
      ),
    });
  }, [navigation]);

  const deleteHandler = (id) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };

  const handleEditProduct = (id) => {
    navigation.navigate("EditProduct", { productId: id });
  };
  return (
    <FlatList
      data={userProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProductItem
          image={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => {
            handleEditProduct(item.id);
          }}
        >
          <Button
            color={colors.primary}
            title="Edit"
            onPress={() => {
              handleEditProduct(item.id);
            }}
          />
          <Button
            color={colors.accent}
            title="Delete"
            onPress={() => {
              deleteHandler(item.id);
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProducts;

const styles = StyleSheet.create({});
