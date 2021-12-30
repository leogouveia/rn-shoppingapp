import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const OrdersScreen = () => {
  const orders = useSelector((state) => state.orders.orders);
  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
      />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
