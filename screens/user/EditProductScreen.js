import { Ionicons } from "@expo/vector-icons";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useState,
} from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import GenericHeaderButton from "../../components/UI/GenericHeaderButton";
import Input from "../../components/UI/Input";
import colors from "../../constants/colors";
import { createProduct, updateProduct } from "../../store/actions/products";

const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      const inputValidities = {
        ...state.inputValidities,
        [action.payload.inputField]: action.payload.isValid,
      };
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          [action.payload.inputField]: action.payload.value,
        },
        inputValidities,
        formIsValid: Object.keys(inputValidities).every(
          (key) => inputValidities[key]
        ),
      };
  }
  return state;
};

const EditProductScreen = ({ navigation, route }) => {
  const { productId } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct?.title ?? "",
      imageUrl: editedProduct?.imageUrl ?? "",
      description: editedProduct?.description ?? "",
      price: "",
    },
    inputValidities: {
      title: !!editedProduct,
      imageUrl: !!editedProduct,
      description: !!editedProduct,
      price: !!editedProduct,
    },
    formIsValid: !!editedProduct,
  });

  const handleInputChange = (inputName, value, isValid) => {
    //console.log("handleInputChange changes");

    dispatchFormState({
      type: "UPDATE",
      payload: { inputField: inputName, value, isValid },
    });
    //console.log({ inputName, value, isValid }, formState);
  };

  const handleSubmit = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input", "Please check if all values are valid.", [
        { text: "Ok" },
      ]);
      return;
    }

    const { title, description, imageUrl, price } = formState.inputValues;

    setError(null);
    setIsLoading(true);
    try {
      if (editedProduct) {
        await dispatch(updateProduct(productId, title, description, imageUrl));
      } else {
        await dispatch(createProduct(title, description, imageUrl, +price));
      }
      navigation.goBack();
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [formState, dispatch, productId]);

  useEffect(() => {
    if (error) {
      Alert.alert("An error has occurred.", error, [{ text: "Okay" }]);
    }
  }, [error]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: productId ? "Edit Product" : "Add Product",
      headerRight: () => (
        <GenericHeaderButton
          onPress={() => {
            handleSubmit();
          }}
          icon={
            <Ionicons
              name={Platform.OS === "android" ? "checkmark" : "ios-checkmark"}
              size={30}
            />
          }
        />
      ),
    });
  }, [navigation, productId, handleSubmit]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            label="Title"
            errorText={`Please, enter a valid title`}
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            initialValue={formState.inputValues.title}
            initialValueIsValid={formState.inputValidities.title}
            required
            onInputChange={(...val) => handleInputChange("title", ...val)}
          />

          <Input
            label="Image"
            errorText={`Please, enter a valid image url`}
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            initialValue={formState.inputValues.imageUrl}
            initialValueIsValid={formState.inputValidities.imageUrl}
            onInputChange={(...val) => handleInputChange("imageUrl", ...val)}
          />

          {!editedProduct && (
            <Input
              label="Price"
              errorText={`Please, enter a valid price`}
              keyboardType="decimal-pad"
              returnKeyType="next"
              initialValue={formState.inputValues.price}
              initialValueIsValid={formState.inputValidities.price}
              onInputChange={(...val) => handleInputChange("price", ...val)}
              min=".01"
              numeric
            />
          )}

          <Input
            label="Description"
            errorText={`Please, enter a valid description`}
            initialValue={formState.inputValues.description}
            initialValueIsValid={formState.inputValues.description}
            onInputChange={(...val) => handleInputChange("description", ...val)}
            multiline
            numberOfLines={3}
          />

          {/* {formState.formIsValid ? (
          <Text style={{ color: "blue" }}>Form is Valid</Text>
        ) : (
          <Text style={{ color: "red" }}>Form is NOT valid.</Text>
        )}
        <Text>{JSON.stringify(formState.inputValidities)}</Text> */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
