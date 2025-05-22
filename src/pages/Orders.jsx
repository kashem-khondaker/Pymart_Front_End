import React from "react";
import OrderCart from "../componenets/Orders/orderCart";

const Orders = () => {
  const orders = [
    {
      id: "3645923b-8495-452a-85d0-5c54e5367f81",
      user: 1,
      status: "Not Paid",
      total_price: 200.0,
      created_at: "2025-05-22T11:48:35.576147Z",
      items: [
        {
          id: 1,
          product: {
            id: 10,
            name: "Freefire base Gaming key-board",
            price: 200.0,
          },
          price: 200.0,
          quantity: 1,
          total_price: 200.0,
        },
      ],
    },
    {
      id: "cc637edc-2d2f-4a65-a4fa-f68e8f82d101",
      user: 1,
      status: "Not Paid",
      total_price: 1600.0,
      created_at: "2025-05-22T11:55:02.986171Z",
      items: [
        {
          id: 2,
          product: {
            id: 10,
            name: "Freefire base Gaming keyboard",
            price: 200.0,
          },
          price: 200.0,
          quantity: 5,
          total_price: 1000.0,
        },
        {
          id: 3,
          product: {
            id: 11,
            name: "Man",
            price: 120.0,
          },
          price: 120.0,
          quantity: 5,
          total_price: 600.0,
        },
      ],
    },
  ];

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
