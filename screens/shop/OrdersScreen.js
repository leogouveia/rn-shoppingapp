import React, { useLayoutEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import HeaderDrawerButton from "../../components/UI/HeaderDrawerButton";

const OrdersScreen = ({ navigation }) => {
  const orders = useSelector((state) => state.orders.orders);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "All Products",
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
        renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>}
      />
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
