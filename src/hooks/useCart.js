import { useCallback, useState } from "react";
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
  const [loading, setLoading] = useState(false);

  // create a new cart
  const createOrGetCart = useCallback(async () => {
    setLoading(true);
    try {
      const response = await authApiClient.post("/carts/", {});
      setCart(response.data);
      if (!cartId) {
        setCartId(response.data.id);
        localStorage.setItem("cartId", response.data.id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [cartId]);

  // Add Items
  const AddCartItems = useCallback(
    async (product_id, quantity) => {
      setLoading(true);
      if (!cartId) await createOrGetCart();
      try {
        console.log(product_id, quantity);
        const response = await authApiClient.post(`/carts/${cartId}/items/`, {
          product_id,
          quantity,
        });
        console.log("product added to cart");
        return response.data;
      } catch (error) {
        console.log("Add to Cart Item :", error);
      } finally {
        setLoading(false);
      }
    },
    [cartId, createOrGetCart]
  );

  // Update Item quantity
  const updateCartItemQuantity = useCallback(
    async (itemId, quantity) => {
      console.log(itemId , cartId)
      try {
        console.log("something ... ")
        await authApiClient.patch(`/carts/${cartId}/items/${itemId}/`, {
          quantity,
        });
        
      } catch (error) {
        console.log("Error updating cart items", error);
      } 
    },
    [cartId]
  );

  // console.log(cart);
  // console.log(cartId);

  return {
    cart,
    cartId,
    loading,
    createOrGetCart,
    AddCartItems,
    updateCartItemQuantity,
  };
};

export default useCart;
