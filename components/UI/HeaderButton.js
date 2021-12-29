import React from "react";
import {
  Button,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import CustomTouchableNativeFeedback from "./CustomTouchableNativeFeedback";

const HeaderButton = ({ ...props }) => {
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
        <View>
          <Ionicons
            name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
            size={30}
            color={Platform.OS === "android" ? "#fff" : Colors.primary}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default HeaderButton;

const styles = StyleSheet.create({
  buttonContainer: {},
  touchable: ({ pressed }) => ({
    padding: 10,
    borderWidth: 0,
    borderColor: "white",
    borderRadius: 100,
    overflow: "hidden",
    ...(pressed && Platform.OS !== "android"
      ? { backgroundColor: "rgba(0, 0, 0, 0.2)" }
      : {}),
  }),
});
