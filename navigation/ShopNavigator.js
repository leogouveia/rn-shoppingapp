import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { Platform, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import colors from "../constants/colors";
import COLORS from "../constants/colors";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";

const defaultOptions = {
  ...(Platform.OS === "android"
    ? TransitionPresets.SlideFromRightIOS
    : TransitionPresets.DefaultTransition),
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

const ProductStack = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductStack.Navigator screenOptions={defaultOptions}>
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

const OrdersStack = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersStack.Navigator screenOptions={defaultOptions}>
      <OrdersStack.Screen name="Orders" component={OrdersScreen} />
    </OrdersStack.Navigator>
  );
};

const AdminStack = createStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStack.Navigator screenOptions={defaultOptions}>
      <AdminStack.Screen name="UserProducts" component={UserProductsScreen} />
      <AdminStack.Screen name="EditProduct" component={EditProductScreen} />
    </AdminStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      screenOptions={{
        drawerActiveTintColor: COLORS.primary,
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="OrdersStack"
        options={{
          title: "Orders",
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
        component={OrdersNavigator}
      />
      <Drawer.Screen
        name="AdminStack"
        options={{
          title: "User Products", // this is the title of the drawer
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
        component={AdminNavigator}
      />
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
