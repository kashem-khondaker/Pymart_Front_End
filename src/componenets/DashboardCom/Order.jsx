import React, { useEffect, useState } from "react";
import authApiClient from "../../services/auth-api-client";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await authApiClient.get("/orders/");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);


  return (
    <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
      <div className="card-body">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>

        {loading ? (
          <div className="flex justify-center items-center py-10">
            <span className="loading loading-spinner loading-xl text-secondary"></span>
          </div>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 flex items-center gap-2">
            <span className="text-xl">😕</span> তুমি এখনো কোনো অর্ডার করোনি।
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra table-sm lg:table-md">
              <thead className="text-base text-gray-700">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-medium text-gray-800">
                      #{order.id.slice(0, 8).toUpperCase()}
                    </td>
                    <td>User-{order.user}</td>
                    <td>
                      <div
                        className={`badge badge-outline px-4 py-2 text-sm font-medium ${
                          order.status === "Not Paid"
                            ? "badge-error"
                            : order.status === "Ready to Ship"
                            ? "badge-warning"
                            : order.status === "Shipped"
                            ? "badge-info"
                            : order.status === "Canceled"
                            ? "badge-neutral"
                            : order.status === "Delivered"
                            ? "badge-success"
                            : "badge-ghost"
                        }`}
                      >
                        {order.status}
                      </div>
                    </td>
                    <td>
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="font-semibold">
                      ${order.total_price.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;
