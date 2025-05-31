"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api";
import socket from "@/lib/socket";
import Cookies from "js-cookie";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [couriers, setCouriers] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get("/api/orders/admin/all"); // нужно создать маршрут
    setOrders(res.data);
  };

  const fetchCouriers = async () => {
    const res = await axios.get("/api/users/couriers"); // нужен эндпоинт
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
    await axios.patch(`/api/orders/${orderId}/status`, { status: newStatus });
  };

  const handleAssignCourier = async (orderId, courierId) => {
    await axios.patch(`/api/orders/${orderId}/assign`, { courierId });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Все заказы</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Пользователь</th>
            <th className="p-2 border">Адрес</th>
            <th className="p-2 border">Статус</th>
            <th className="p-2 border">Курьер</th>
            <th className="p-2 border">Действия</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="p-2 border">{order._id.slice(-6)}</td>
              <td className="p-2 border">{order.customer?.name}</td>
              <td className="p-2 border">{order.address}</td>
              <td className="p-2 border">{order.status}</td>
              <td className="p-2 border">{order.courier?.name || "—"}</td>
              <td className="p-2 border">
                <select
                  className="mr-2 border px-1"
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  value={order.status}
                >
                  <option value="created">Создан</option>
                  <option value="confirmed">Подтвержден</option>
                  <option value="in_transit">В пути</option>
                  <option value="delivered">Доставлен</option>
                </select>
                <select
                  onChange={(e) =>
                    handleAssignCourier(order._id, e.target.value)
                  }
                  value={order.courier?._id || ""}
                  className="border px-1"
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
  );
}
