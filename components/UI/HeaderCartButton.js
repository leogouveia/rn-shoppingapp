import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Badge } from "react-native-elements";
import { useSelector } from "react-redux";
import colors from "../../constants/colors";
import Colors from "../../constants/colors";

const HeaderCartButton = ({ ...props }) => {
  const cartLength = useSelector((state) => {
    return Object.keys(state.cart.items).reduce((acc, key) => {
      return acc + state.cart.items[key].quantity;
    }, 0);
  });
  const androidRipple = Platform.OS === "android" && {
    android_ripple: {
      color: "rgba(0,0,0,0.1)",
      borderless: true,
      radius: 20,
    },
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.touchable} {...androidRipple} {...props}>
        {({ pressed }) => (
          <View style={styles.iconContainer}>
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={30}
              color={
                Platform.OS === "android"
                  ? "#fff"
                  : pressed
                  ? Colors.primaryTrasparent20
                  : Colors.primary
              }
            />
            {cartLength > 0 && (
              <Badge
                status="primary"
                containerStyle={{ position: "absolute", top: -5, right: -10 }}
                badgeStyle={{
                  backgroundColor: colors.accent,
                }}
                textStyle={{ color: "white" }}
                value={cartLength}
              />
            )}
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default HeaderCartButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 10,
  },
  touchable: ({ pressed }) => ({
    padding: Platform.OS !== "android" ? 3 : 10,
    borderWidth: 0,
    borderColor: "white",
    borderRadius: 100,
    overflow: "hidden",
  }),
  iconContainer: {
    marginRight: 10,
  },
});
