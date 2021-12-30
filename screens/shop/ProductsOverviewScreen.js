import React, { useLayoutEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import HeaderCartButton from "../../components/UI/HeaderCartButton";
import HeaderDrawerButton from "../../components/UI/HeaderDrawerButton";
import * as cartActions from "../../store/actions/cart";

const ProductsOverviewScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "All Products",
      headerLeft: () => (
        <HeaderDrawerButton onPress={() => navigation.toggleDrawer()} />
      ),
      headerRight: () => (
        <HeaderCartButton onPress={() => navigation.navigate("Cart")} />
      ),
    });
  }, [navigation]);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
          onViewDetail={() => {
            navigation.navigate("ProductDetail", {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            });
          }}
        />
      )}
    ></FlatList>
  );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
