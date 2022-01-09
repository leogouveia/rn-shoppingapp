import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  SET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../actions/products";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        availableProducts: action.payload,
        userProducts: action.payload.filter((prod) => prod.ownerId === "u1"),
      };
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.payload.id,
        "u1",
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        action.payload.price
      );
      return {
        ...state,
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct],
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (p) => p.id === action.payload.id
      );
      console.log("action", action.payload);

      const updatedProduct = new Product(
        action.payload.id,
        "u1",
        action.payload.product.title,
        action.payload.product.imageUrl,
        action.payload.product.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.payload.id
      );
      const updateAvailableProducts = [...state.availableProducts];
      updateAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        userProducts: updatedUserProducts,
        availableProducts: updateAvailableProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (p) => p.id !== action.productId
        ),
        availableProducts: state.availableProducts.filter(
          (p) => p.id !== action.productId
        ),
      };
  }
  return state;
};
