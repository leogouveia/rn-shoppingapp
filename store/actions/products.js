export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

export const createProduct = (title, description, imageUrl, price) => {
  return {
    type: CREATE_PRODUCT,
    payload: {
      title,
      description,
      imageUrl,
      price,
    },
  };
};

export const updateProduct = (id, title, description, imageUrl, price) => {
  return {
    type: UPDATE_PRODUCT,
    payload: {
      id,
      product: {
        title,
        description,
        imageUrl,
        price,
      },
    },
  };
};
