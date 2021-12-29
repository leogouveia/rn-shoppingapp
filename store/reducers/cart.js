import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].totalAmount + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice,
      };

    case REMOVE_FROM_CART:
      const { [action.productId]: removedProduct, ...items } = state.items;
      let updatedProduct;
      if (removedProduct.quantity > 1) {
        const prodTitle = removedProduct.productTitle;
        const prodPrice = removedProduct.productPrice;
        const prodQty = removedProduct.quantity - 1;
        const ProdAmount = removedProduct.totalAmount - prodPrice;
        updatedProduct = new CartItem(
          prodQty,
          prodPrice,
          prodTitle,
          ProdAmount
        );
      }
      return {
        ...state,
        items: {
          ...items,
          ...(removedProduct.quantity > 1
            ? {
                [action.productId]: updatedProduct,
              }
            : {}),
        },
        totalAmount: state.totalAmount - removedProduct.price,
      };
  }

  return state;
};
