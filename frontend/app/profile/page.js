"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/api";
import Cookies from "js-cookie";
import OrderCard from "@/components/OrderCard";
import socket from "@/lib/socket"; // твой socket

export default function ProfilePage() {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentOrder) return;

    const handleOrderUpdate = (updatedOrder) => {
      if (updatedOrder._id === currentOrder._id) {
        setCurrentOrder(updatedOrder);

        // Если заказ доставлен — переносим его в историю
        if (updatedOrder.status === "delivered") {
          setOrderHistory((prev) => [updatedOrder, ...prev]);
          setCurrentOrder(null);
        }
      }
    };

    socket.on("orderUpdated", handleOrderUpdate);

    return () => {
      socket.off("orderUpdated", handleOrderUpdate);
    };
  }, [currentOrder]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const { data } = await axios.get("/orders/my");
        const active = data.find((o) =>
          ["pending", "accepted", "preparing", "on_the_way"].includes(o.status)
        );
        const history = data.filter((o) => o.status === "delivered");

        setCurrentOrder(active || null);
        setOrderHistory(history);
      } catch (err) {
        console.error("Ошибка загрузки заказов:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-6 text-gray-600">Загрузка заказов...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h1 className="text-3xl font-bold mb-6">Профиль</h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Текущий заказ</h2>
        {currentOrder ? (
          <OrderCard order={currentOrder} />
        ) : (
          <p className="text-gray-500">Нет активных заказов</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">История заказов</h2>
        {orderHistory.length === 0 ? (
          <p className="text-gray-500">История заказов пуста</p>
        ) : (
          <div className="space-y-4">
            {orderHistory.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
