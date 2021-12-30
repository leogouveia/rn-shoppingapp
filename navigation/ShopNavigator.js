import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import { color } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import colors from "../constants/colors";
import COLORS from "../constants/colors";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import ProductDetailsScreen from "../screens/shop/ProductDetailsScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";

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
