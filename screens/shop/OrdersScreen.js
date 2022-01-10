import React, { useLayoutEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import HeaderDrawerButton from "../../components/UI/HeaderDrawerButton";

const OrdersScreen = ({ navigation }) => {
  const orders = useSelector((state) => state.orders.orders);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Orders",
      headerLeft: () => (
        <HeaderDrawerButton onPress={() => navigation.toggleDrawer()} />
      ),
    });
  }, [navigation]);

  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <OrderItem
            amount={itemData.item.totalAmount.toFixed(2)}
            date={itemData.item.dateString}
            items={itemData.item.items}
          />
        )}
      />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
