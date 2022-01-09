import React, { useEffect, useReducer } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.payload.text,
        isValid: action.payload.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
  }
  return state;
};

const validateEmail = (val) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
  return regex.test(val ?? "");
};

const Input = ({
  label,
  name,
  value,
  initialValue = "",
  initialValueIsValid,
  isValid = false,
  errorText,
  onInputChange,
  ...props
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue ?? "",
    isValid: initialValueIsValid,
    touched: false,
  });

  const handleInputChange = (text) => {
    let isValid = true;

    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !validateEmail(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    if (props.numeric != null && isNaN(text)) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, payload: { text, isValid } });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  useEffect(() => {
    console.log("useEffect: inputState");
    // lostFocusHandler();
    // if (inputState.touched) {
    onInputChange(inputState.value, inputState.isValid);
    // }
  }, [inputState]);

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={handleInputChange}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && <Text style={{ color: "red" }}>{errorText}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    // borderRadius: 2,
  },
});
