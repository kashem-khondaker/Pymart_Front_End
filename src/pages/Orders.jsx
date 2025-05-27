import React, { useEffect, useState } from "react";
import OrderCart from "../componenets/Orders/orderCart";
import authApiClient from "../services/auth-api-client";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    authApiClient.get(`/orders/`).then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Order details</h1>
      {orders.map((order) => {
        return <OrderCart key={order.id} order={order} />;
      })}
    </div>
  );
};

export default Orders;
