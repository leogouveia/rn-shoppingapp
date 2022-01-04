import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import Colors from "../../constants/colors";

const HeaderEditProductButton = ({ ...props }) => {
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
          <View>
            <Ionicons
              name={Platform.OS === "android" ? "create" : "ios-create"}
              size={30}
              color={
                Platform.OS === "android"
                  ? "#fff"
                  : pressed
                  ? Colors.primaryTrasparent20
                  : Colors.primary
              }
            />
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default HeaderEditProductButton;

const styles = StyleSheet.create({
  buttonContainer: {},
  touchable: ({ pressed }) => ({
    padding: Platform.OS !== "android" ? 3 : 10,
    borderWidth: 0,
    borderColor: "white",
    borderRadius: 100,
    overflow: "hidden",
  }),
});
