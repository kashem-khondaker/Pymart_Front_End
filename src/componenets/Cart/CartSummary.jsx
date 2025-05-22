import React from "react";
import authApiClient from "../../services/auth-api-client";

const CartSummary = ({totalPrice , itemCount , cartId}) => {
  const shipping = totalPrice < 100 ? 0 : 10;
  const tax = totalPrice * 0.10 ;
  const orderTotal = totalPrice + shipping + tax

  const deleteCart = async() => {
    try {
      const response = await authApiClient.delete(`/carts/${cartId}/`)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  const createOrder = async() => {
    try {
      const order = await authApiClient.post(`/orders/`,{cart_id: cartId})
      console.log(order)
      if (order?.status === 201) {
        await deleteCart();
        alert("Order Placed Successfully .")
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">Subtotal {itemCount} items</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Total Price</span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Shipping</span>
            <span>${shipping != 10 ? "Free" : 10 }</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Estimated Tax</span>
            <span>${tax}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between font-medium">
              <span>Order Total</span>
              <span>${orderTotal}</span>
            </div>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary w-full" onClick={createOrder}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
