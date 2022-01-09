import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

const baseUrl = "http://10.0.2.2:1337/parse/classes";

const mfetch = (url, options = {}) => {
  const { headers, ...anotherOptions } = options;
  const newOptions = {
    method: "GET",
    headers: {
      "X-Parse-Application-Id": "APP_ID_1",
      ...(headers || {}),
    },
    ...anotherOptions,
  };
  console.log(`${baseUrl}${url}`);
  console.log(newOptions);
  return fetch(`${baseUrl}${url}`, newOptions);
};

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await mfetch("/Product", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const { results: data } = await response.json();

    // console.log({ data });

    const loadedProducts = [];

    for (const product of data) {
      loadedProducts.push(
        new Product(
          product.objectId,
          "u1",
          product.title,
          product.imageUrl,
          product.description,
          product.price
        )
      );
    }
    dispatch({ type: SET_PRODUCTS, payload: loadedProducts });
  } catch (err) {
    // send to custom analytics server maybe.
    console.log({ err });
    throw err;
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  const response = await mfetch("/Product/" + productId, {
    method: "DELETE",
  });

  if (!response.ok) {
    console.log(response);
    throw "Error trying to delete item. Try again later.";
  }

  dispatch({
    type: DELETE_PRODUCT,
    productId,
  });
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    const response = await mfetch(
      "http://10.0.2.2:1337/parse/classes/Product",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Parse-Application-Id": "APP_ID_1",
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: "u1",
        }),
      }
    );

    const data = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        id: data.objectId,
        title,
        description,
        imageUrl,
        price,
        ownerId: "u1",
      },
    });
  };
};

export const updateProduct =
  (id, title, description, imageUrl, price) => async (dispatch) => {
    const response = await mfetch("/Product/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        price,
        ownerId: "u1",
      }),
    });

    if (!response.ok) {
      console.log(response);
      throw "Error trying to update item. Try again later.";
    }

    dispatch({
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
    });
  };
