import React from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import colors from "../../constants/colors";
import { removeFromCart } from "../../store/actions/cart";

const CartScreen = () => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    return Object.keys(state.cart.items).map((key) => ({
      ...state.cart.items[key],
      productId: key,
    }));
  });
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amountText}>${cartTotalAmount.toFixed(2)}</Text>
        </Text>
        <Button color={colors.accent} title="Order Now" />
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <CartItem
            id={item.productId}
            title={item.productTitle}
            quantity={item.quantity}
            amount={item.totalAmount}
            onRemove={(productId) => {
              dispatch(removeFromCart(productId));
            }}
          />
        )}
      ></FlatList>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amountText: {
    color: colors.primary,
  },
});
