import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";
import ShopNavigator from "./navigation/ShopNavigator";
import productsReducer from "./store/reducers/products";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  products: productsReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default function App() {
  let [fontsLoaded] = Font.useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
