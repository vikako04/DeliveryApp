"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/api";
import Cookies from "js-cookie";
import OrderCard from "@/components/OrderCard";

export default function ProfilePage() {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const { data } = await axios.get("/orders/my");
        const active = data.find((o) => o.status !== "delivered");
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
