import React, { useLayoutEffect } from "react";
import { Button, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import HeaderCartButton from "../../components/UI/HeaderCartButton";
import HeaderDrawerButton from "../../components/UI/HeaderDrawerButton";
import colors from "../../constants/colors";
import * as cartActions from "../../store/actions/cart";

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "All Products",
      headerLeft: () => (
        <HeaderDrawerButton onPress={() => navigation.toggleDrawer()} />
      ),
      headerRight: () => (
        <HeaderCartButton onPress={() => navigation.navigate("Cart")} />
      ),
    });
  }, [navigation]);

  const handleViewItemDetails = (id, title) => {
    navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            handleViewItemDetails(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            title="View Details"
            color={colors.primary}
            onPress={() => {
              handleViewItemDetails(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            title="Add To Cart"
            color={colors.accent}
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    ></FlatList>
  );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
