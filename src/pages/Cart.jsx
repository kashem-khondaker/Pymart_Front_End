import React, { Suspense, useEffect, useState } from "react";
import useCartContext from "../hooks/useCartContext";
import CartItemList from "../componenets/Cart/CartItemList";
import CartSummary from "../componenets/Cart/CartSummary";

const Cart = () => {
  const {
    cart,
    cartId,
    loading,
    createOrGetCart,
    updateCartItemQuantity,
    deleteCartItem,
  } = useCartContext();
  // console.log(cart.items.product)
  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    if (!cart && !loading) createOrGetCart();
  }, [createOrGetCart, cart, loading]);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  const handleUpdateCartItemQuantity = async (itemId, newQuantity) => {
    setLocalCart((prevLocalCart) => {
      const updatedItem = prevLocalCart.items.map((item) =>
        item.id === itemId
          ? {
              ...item,
              quantity: newQuantity,
              total_price: item.product.price * newQuantity,
            }
          : item
      );

      return {
        ...prevLocalCart,
        items: updatedItem,
        total_price: updatedItem.reduce(
          (sum, item) => sum + item.total_price,
          0
        ),
      };
    });
    try {
      await updateCartItemQuantity(itemId, newQuantity);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    setLocalCart((prevLocalCart) => {
      const updatedItems = prevLocalCart.items.filter(
        (item) => item.id != itemId
      );
      return {
        ...prevLocalCart,
        items: updatedItems,
        total_price: updatedItems.reduce(
          (sum, item) => sum + item.total_price,
          0
        ),
      };
    });

    try {
      deleteCartItem(itemId);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading || !localCart) return <p>Loading...</p>;
  // if () return <p>Loading.</p>
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Suspense fallback={<p>Loading...</p>}>
            <CartItemList
              items={localCart.items}
              handleCartItemQuantity={handleUpdateCartItemQuantity}
              handleRemoveCartItem={handleRemoveItem}
            />
          </Suspense>
        </div>
        <div>
          <CartSummary
            totalPrice={localCart.total_price}
            itemCount={localCart.items.length}
            cartId={cartId}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
