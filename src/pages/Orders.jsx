import React, { useEffect, useState } from "react";
import OrderCart from "../componenets/Orders/orderCart";
import authApiClient from "../services/auth-api-client";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    authApiClient.get(`/orders/`).then((res) => setOrders(res.data));
  }, []);

  const handleCancelOrder = async (orderId) => {
    try {
      const response = await authApiClient.post(`/orders/${orderId}/cancel/`);
      console.log(response.data);
      if (response.status === 200) {
        setOrders((prevOrder) =>
          prevOrder.map((order) =>
            order.id === orderId ? { ...order, status: "Canceled" } : order
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Order details</h1>
      {orders.map((order) => {
        return (
          <OrderCart
            key={order.id}
            order={order}
            onCancel={handleCancelOrder}
          />
        );
      })}
    </div>
  );
};

export default Orders;
