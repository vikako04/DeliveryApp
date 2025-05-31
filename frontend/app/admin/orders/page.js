"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api";
import socket from "@/lib/socket";
import Cookies from "js-cookie";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [couriers, setCouriers] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get("/orders/admin/all"); // нужно создать маршрут
    setOrders(res.data);
  };

  const fetchCouriers = async () => {
    const res = await axios.get("/users/couriers"); // нужен эндпоинт
    setCouriers(res.data);
  };

  useEffect(() => {
    fetchOrders();
    fetchCouriers();

    socket.on("orderUpdated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
      );
    });

    return () => socket.off("orderUpdated");
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`/orders/${orderId}/status`, { status: newStatus });
    } catch (error) {
      console.error(
        "Ошибка изменения статуса:",
        error.response?.data || error.message
      );
      alert(
        "Ошибка при изменении статуса: " +
          (error.response?.data?.error || error.message)
      );
    }
  };

  const handleAssignCourier = async (orderId, courierId) => {
    if (!courierId) return; // не отправляем пустой ID

    try {
      await axios.patch(`/orders/${orderId}/assign`, { courierId });
    } catch (error) {
      console.error(
        "Ошибка назначения курьера:",
        error.response?.data || error
      );
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Все заказы</h1>

      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full bg-white border border-gray-200 rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-sm">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Пользователь</th>
              <th className="p-3 text-left">Адрес</th>
              <th className="p-3 text-left">Статус</th>
              <th className="p-3 text-left">Курьер</th>
              <th className="p-3 text-left">Действия</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-200">
            {orders.map((order, index) => (
              <tr
                key={order._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="p-3">{order._id.slice(-6)}</td>
                <td className="p-3">{order.customer?.name}</td>
                <td className="p-3">{order.address}</td>
                <td className="p-3 font-medium text-gray-700">
                  {order.status}
                </td>
                <td className="p-3">{order.courier?.name || "—"}</td>
                <td className="p-3 flex flex-col sm:flex-row gap-2">
                  <select
                    className="border rounded-md px-2 py-1 text-sm"
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    value={order.status}
                  >
                    <option value="accepted">Принят</option>
                    <option value="preparing">Готовится</option>
                    <option value="on_the_way">В пути</option>
                    <option value="delivered">Доставлен</option>
                  </select>
                  <select
                    onChange={(e) =>
                      handleAssignCourier(order._id, e.target.value)
                    }
                    value={order.courier?._id || ""}
                    className="border rounded-md px-2 py-1 text-sm"
                  >
                    <option value="">Назначить курьера</option>
                    {couriers.map((courier) => (
                      <option key={courier._id} value={courier._id}>
                        {courier.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
