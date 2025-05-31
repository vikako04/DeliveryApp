/* eslint-disable @next/next/no-img-element */
"use client";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import axios from "@/lib/api";
import Cookies from "js-cookie";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [message, setMessage] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    const token = Cookies.get("token");
    if (!token) return setMessage("🔒 Войдите для оформления заказа");

    const orderData = {
      store: cart[0].product.store,
      items: cart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      })),
      address,
      paymentMethod,
    };

    try {
      await axios.post("/orders", orderData);
      clearCart();
      setAddress("");
      setMessage("Заказ успешно оформлен!");
    } catch (err) {
      setMessage("Ошибка при оформлении заказа");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-6">
      <h1 className="text-3xl font-bold mb-6">Корзина</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Корзина пуста</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {/* Список товаров */}
          <div className="md:col-span-2 space-y-4">
            {cart.map(({ product, quantity }) => (
              <div
                key={product._id}
                className="bg-white shadow-md rounded-lg p-4 flex gap-4 items-center"
              >
                <img
                  src={product.image || "/product-placeholder.png"}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold text-lg">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    <i className="bi bi-fork-knife mr-1"></i>
                    {product.category}
                  </p>
                  <p className="text-sm text-gray-600">
                    <i className="pi pi-info-circle mr-1 relative top-[1px]"></i>
                    {product.description}
                  </p>
                  <span className="text-lg">
                    {product.price}
                    <i className="pi pi-wallet ml-2 relative top-[1px]"></i>
                  </span>
                </div>
                <div className="flex items-center gap-2 mr-4 mt-2 md:mt-0">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      updateQuantity(product._id, parseInt(e.target.value))
                    }
                    className="w-16 px-2 py-1 text-center btn-primary focus:ring-0 rounded focus:outline-none focus:ring-0"
                  />
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-red-500 hover:text-red-600 cursor-pointer transition duration-500 transform hover:scale-105 text-2xl"
                  >
                    <i className="pi pi-trash"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Форма оформления */}
          <div className=" p-6 rounded-lg h-fit">
            <h2 className="text-2xl font-bold mb-4">Оформление заказа</h2>

            <input
              type="text"
              placeholder="Адрес доставки"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-xl p-3 transition focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              required
            />

            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border-gray-300  px-4 py-3 mt-3 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="cash">Наличные при получении</option>
              <option value="card">Картой онлайн</option>
            </select>

            <div className="mb-4 text-lg">
              <p>
                <span className="font-semibold">Сумма:</span>{" "}
                <span className=" font-bold">{total} Tg</span>
              </p>
            </div>

            <button onClick={handleOrder} className="btn-primary">
              Подтвердить заказ
            </button>

            {message && (
              <p className=" mt-4 text-center text-sm text-gray-700">
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
