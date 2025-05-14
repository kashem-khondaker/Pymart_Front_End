import React, { useEffect } from "react";
import useCartContext from "../hooks/useCartContext";

const Cart = () => {
  const { cart, createOrGetCart } = useCartContext();
  useEffect(() => {
    createOrGetCart();
  }, []);
  console.log(cart);
  return (
    <div>
      This is cart page .<p>{JSON.stringify(cart)}</p>
    </div>
  );
};

export default Cart;
