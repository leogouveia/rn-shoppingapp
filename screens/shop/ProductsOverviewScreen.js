import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import HeaderCartButton from "../../components/UI/HeaderCartButton";
import HeaderDrawerButton from "../../components/UI/HeaderDrawerButton";
import colors from "../../constants/colors";
import * as cartActions from "../../store/actions/cart";
import { fetchProducts } from "../../store/actions/products";

const ProductsOverviewScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, fetchProducts, setIsLoading, setError]);

  useEffect(() => {
    loadProducts();
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadProducts);
    return unsubscribe;
  }, [loadProducts]);

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

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some.</Text>
      </View>
    );
  }

  if (!isLoading && error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred.</Text>
        <Button
          title="Try again."
          onPress={loadProducts}
          color={colors.primary}
        />
      </View>
    );
  }

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

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
