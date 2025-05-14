import  { useCallback, useState } from "react";
import authApiClient from "../services/auth-api-client";

const useCart = () => {
  // const [authToken, setAuthToken] = useState(() => {
  //   const tokens = localStorage.getItem("authTokens");
  //   return tokens ? JSON.parse(tokens).access : null;
  // });
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => {
    const id = localStorage.getItem("cartId");
    return id ? id : null;
  });

  // create a new cart
  const createOrGetCart = useCallback(async() => {
    try {
      const response = await authApiClient.post(
        "/carts/"
      );
      setCart(response.data);
      if (!cartId) {
        setCartId(response.data.id);
        localStorage.setItem("cartId", response.data.id);
      }
    } catch (error) {
      console.log(error);
    }
  },[cartId]);

  // Add Items
  const AddCartItems = useCallback(async(product_id, quantity) => {
    if (!cartId) await createOrGetCart();
    try {
      console.log(product_id , quantity);
      const response = await authApiClient.post(
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
  },[cartId , createOrGetCart])

  return {
    cart,
    cartId,
    createOrGetCart,
    AddCartItems,
  };
};

export default useCart;
