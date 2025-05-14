import React, { useState } from "react";
import apiClient from "../services/api-client";

const useCart = () => {
  const [authToken, setAuthToken] = useState(() => {
    const tokens = localStorage.getItem("authTokens");
    return tokens ? JSON.parse(tokens).access : null;
  });
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => {
    const id = localStorage.getItem("cartId");
    return id ? id : null;
  });

  // create a new cart
  const createOrGetCart = async () => {
    try {
      const response = await apiClient.post(
        "/carts/",
        {},
        { headers: { Authorization: `JWT ${authToken}` } }
      );
      setCart(response.data);
      if (!cartId) {
        setCartId(response.data.id);
        localStorage.setItem("cartId", response.data.id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Add Items
  const AddCartItems = async (product_id, quantity) => {
    if (!cartId) await createOrGetCart();
    try {
      console.log(product_id , quantity);
      const response = await apiClient.post(
        `/carts/${cartId}/items/`,
        {
          product_id,
          quantity,
        }
      );
      console.log("product added to cart");
      return response.data;
    } catch (error) {
      console.log("Add to Cart Item :", error);
    }
  };

  return {
    cart,
    cartId,
    createOrGetCart,
    AddCartItems,
  };
};

export default useCart;
