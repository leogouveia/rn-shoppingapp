import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import COLORS from "../constants/colors";
import { NavigationContainer } from "@react-navigation/native";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";

const ProductStack = createNativeStackNavigator();
const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <ProductStack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontFamily: "open-sans-bold",
          },
          headerBackTitleStyle: {
            fontFamily: "open-sans",
          },
          headerStyle: {
            backgroundColor: Platform.OS === "android" ? COLORS.primary : "",
          },
          headerTintColor: Platform.OS === "android" ? "#fff" : COLORS.primary,
        }}
      >
        <ProductStack.Screen
          name="ProductsOverview"
          component={ProductsOverviewScreen}
        />
        <ProductStack.Screen
          name="ProductDetail"
          component={ProductDetailsScreen}
        />
      </ProductStack.Navigator>
    </NavigationContainer>
  );
};

export default ShopNavigator;

const styles = StyleSheet.create({});
