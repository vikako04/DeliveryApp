"use client";
import { useState, useEffect } from "react";
import axios from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";

export default function CreateProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/products",
        { name, category, description, price, image, store: storeId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      router.push(`/products/${storeId}`);
    } catch (err) {
      alert("Ошибка при создании продукта");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Добавить продукт</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-xl p-3 transition focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          required
        />
        <input
          type="text"
          placeholder="Категория"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-xl p-3 transition focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          required
        />
        <textarea
          placeholder="Описание"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-xl p-3 transition focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          required
        />
        <input
          type="number"
          placeholder="Цена"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-xl p-3 transition focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          required
        />
        <UploadButton
          appearance={{
            button: "btn-primary", // Убираем растяжение
            allowedContent: "text-sm text-gray-500 mt-2",
          }}
          endpoint="imageUploader"
          onClientUploadComplete={async (res) => {
            const uploadedUrl = res?.[0]?.url;
            if (!uploadedUrl) return; // Если нет URL, ничего не делаем

            setImage(uploadedUrl);
            alert("Upload Completed");
          }}
        />

        <button type="submit" className="btn-primary w-full">
          Добавить продукт
        </button>
      </form>
    </div>
  );
}
