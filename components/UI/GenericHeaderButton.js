import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const GenericHeaderButton = ({ icon, ...props }) => {
  const androidRipple = Platform.OS === "android" && {
    android_ripple: {
      color: "rgba(0,0,0,0.1)",
      borderless: true,
      radius: 20,
    },
  };

  const Icon = ({ pressed, ...props }) => {
    return React.cloneElement(icon, {
      ...props,
      color:
        Platform.OS === "android"
          ? "#fff"
          : pressed
          ? Colors.primaryTrasparent20
          : Colors.primary,
    });
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.touchable} {...androidRipple} {...props}>
        {({ pressed }) => (
          <View>
            <Icon color={"#fff"} pressed={pressed} />
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default GenericHeaderButton;

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
