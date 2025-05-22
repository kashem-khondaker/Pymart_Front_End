import React from "react";

const OrderTable = ({ order }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3 text-right">Quantity</th>
            <th className="px-4 py-3 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            // Order Items
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3 font-medium">{item.product.name}</td>
              <td className="px-4 py-3 text-right">${item.price.toFixed(2)}</td>
              <td className="px-4 py-3 text-right">{item.quantity}</td>
              <td className="px-4 py-3 text-right">
                ${item.total_price.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
