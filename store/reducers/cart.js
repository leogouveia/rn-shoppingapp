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
      const items = { ...state.items };

      const removedItem = { ...state.items[action.productId] };

      let totalAmount = state.totalAmount - removedItem.productPrice;
      if (totalAmount < 0) totalAmount = 0;

      if (removedItem.quantity === 1) {
        delete items[action.productId];
      } else {
        items[action.productId] = new CartItem(
          removedItem.quantity - 1,
          removedItem.productPrice,
          removedItem.productTitle,
          removedItem.totalAmount - removedItem.productPrice
        );
      }
      return { ...state, items, totalAmount };
  }

  return state;
};
