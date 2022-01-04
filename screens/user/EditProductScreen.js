import { Ionicons } from "@expo/vector-icons";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import GenericHeaderButton from "../../components/UI/GenericHeaderButton";
import { createProduct, updateProduct } from "../../store/actions/products";

const EditProductScreen = ({ navigation, route }) => {
  const { productId } = route.params;
  const editedProduct = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === productId)
  );
  const [title, setTitle] = useState(editedProduct?.title ?? "");
  const [imageUrl, setImageUrl] = useState(editedProduct?.imageUrl ?? "");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct?.description ?? ""
  );
  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    console.log({
      productId,
      title,
      imageUrl,
      description,
    });
    if (editedProduct) {
      dispatch(updateProduct(productId, title, description, imageUrl));
    } else {
      dispatch(createProduct(title, description, imageUrl, +price));
    }
    navigation.goBack();
  }, [dispatch, productId, title, imageUrl, description, price]);

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

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={setImageUrl}
          />
        </View>
        {!editedProduct && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
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
