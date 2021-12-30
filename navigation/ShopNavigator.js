import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, StyleSheet } from "react-native";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import COLORS from "../constants/colors";
import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
} from "@react-navigation/native";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";

import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { useLayoutEffect } from "react";
import HeaderButton from "../components/UI/HeaderButton";

const defaultOptions = {
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
};

const ProductStack = createNativeStackNavigator();

const ProductsNavigator = ({ navigation, route }) => {
  return (
    <ProductStack.Navigator
      screenOptions={{
        headerShown: false,
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
      <ProductStack.Screen name="Cart" component={CartScreen} />
    </ProductStack.Navigator>
  );
};

const OrdersStack = createNativeStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersStack.Navigator screenOptions={defaultOptions}>
      <OrdersStack.Screen name="Orders" component={OrdersScreen} />
    </OrdersStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      screenOptions={{
        drawerActiveTintColor: COLORS.primary,
        ...defaultOptions,
      }}
    >
      <Drawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={({ route, navigation }) => ({
          headerTitle: (() => {
            const routeName = getFocusedRouteNameFromRoute(route);

            switch (routeName) {
              case "ProductsOverview":
              case "Products":
                return "All Products";
            }
            return routeName;
          })(),
          ...(getFocusedRouteNameFromRoute(route) === "ProductsOverview" && {
            headerRight: () => (
              <HeaderButton onPress={() => navigation.navigate("Cart")} />
            ),
          }),
        })}
      />
      <Drawer.Screen name="Orders" component={OrdersNavigator} />
    </Drawer.Navigator>
  );
};

const ShopNavigator = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default ShopNavigator;

const styles = StyleSheet.create({});
