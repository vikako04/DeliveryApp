"use client";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    console.log("Добавляем в корзину:", product);
    setCart((prev) => {
      const existing = prev.find((item) => item.product._id === product._id);
      if (existing) {
        const updated = prev.map((item) =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log("Обновляем количество:", updated);
        return updated;
      } else {
        const newCart = [...prev, { product, quantity: 1 }];
        console.log("Добавляем новый товар:", newCart);
        return newCart;
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
