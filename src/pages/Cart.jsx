import React, { Suspense, useEffect, useState } from "react";
import useCartContext from "../hooks/useCartContext";
import CartItemList from "../componenets/Cart/CartItemList";

const Cart = () => {
  const { cart, loading, createOrGetCart, updateCartItemQuantity,deleteCartItem } =
    useCartContext();
  // console.log(cart.items.product)
  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    if (!cart && !loading) createOrGetCart();
  }, [createOrGetCart, cart, loading]);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  const handleUpdateCartItemQuantity = async (itemId, newQuantity) => {
    setLocalCart((prevLocalCart) => ({
      ...prevLocalCart,
      items: prevLocalCart.items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ),
    }));
    try {
      await updateCartItemQuantity(itemId, newQuantity);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    setLocalCart((prevLocalCart) => ({
      ...prevLocalCart,
      items: prevLocalCart.items.filter((item) => item.id != itemId),
    }));

    try {
      deleteCartItem(itemId)
    } catch (error) {
      console.log(error)
    }
  };

  if (loading || !localCart) return <p>Loading...</p>;
  // if () return <p>Loading.</p>
  return (
    <div className="flex justify-between">
      <div>
        <Suspense fallback={<p>Loading...</p>}>
          <CartItemList
            items={localCart.items}
            handleCartItemQuantity={handleUpdateCartItemQuantity}
            handleRemoveCartItem={handleRemoveItem}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default Cart;
