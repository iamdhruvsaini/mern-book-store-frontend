import { Alert } from "@/components/ui/alert";
import { useAuth } from "@/context/AuthContex";
import {
  useCancelOrderMutation,
  useGetOrderByEmailQuery,
} from "@/redux/features/orders/ordersApi";
import React from "react";
import Swal from "sweetalert2";

const OrderPage = () => {
  const { currentUser } = useAuth();
  const { data: orders = [], isLoading } = useGetOrderByEmailQuery(
    currentUser.email
  );
  const [cancelOrder] = useCancelOrderMutation();

  const handleCancelOrder = async (id) => {
    try {
      const response = await cancelOrder(id).unwrap();
      Swal.fire({
        title: "Order Cancelled",
        text: "Your Order is Cancelled Refresh the Page",
        icon: "success",

      });
      
    } catch (error) {
      alert("Some Error Occurred");
    }
  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <div>No Orders Found ! </div>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={order._id} className="border-b mb-4 pb-4">
              <div className="flex justify-between">
                <p className="bg-yellow-600 text-white rounded-md p-1 mb-3 w-20">
                  # {index + 1}
                </p>
                <button
                  className="bg-red-200 p-2 text-sm rounded-md text-red-800 font-semibold"
                  onClick={() => handleCancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              </div>
              <h2 className="font-bold">Order ID: {order._id}</h2>
              <p className="text-gray-600">Name: {order.name}</p>
              <p className="text-gray-600">Email: {order.email}</p>
              <p className="text-gray-600">Phone: {order.phone}</p>
              <p className="text-gray-600">Total Price: ${order.totalPrice}</p>

              <h3 className="font-semibold mt-2">Address:</h3>
              <p>
                {order.address.city}, {order.address.state},{" "}
                {order.address.country}, {order.address.zipcode}
              </p>

              <h3 className="font-semibold mt-2">Products ID:</h3>
              <ul>
                {order.productsIds.map((productId) => (
                  <li key={productId}>{productId}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
