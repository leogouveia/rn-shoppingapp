import React from "react";
import {
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacityComponent,
} from "react-native";

const CustomTouchableNativeFeedback = ({ children, ...props }) => {
  let TouchableCmp = TouchableOpacityComponent;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return <TouchableCmp {...props}>{children}</TouchableCmp>;
};

export default CustomTouchableNativeFeedback;

const styles = StyleSheet.create({});
