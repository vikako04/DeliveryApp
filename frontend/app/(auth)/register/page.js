"use client";
import { useState } from "react";
import { register } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState(""); // <--- добавили
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password); // <--- передаем name
      router.push("/");
    } catch (err) {
      setError("Ошибка при регистрации");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Регистрация</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Имя"
          className="w-full bg-white border border-gray-300 rounded-xl p-3 transition focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-white border border-gray-300 rounded-xl p-3 transition focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className="w-full bg-white border border-gray-300 rounded-xl p-3 transition focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="text-red-500">{error}</p>}
        <button className="w-full btn-primary">Зарегистрироваться</button>
      </form>
    </div>
  );
}
