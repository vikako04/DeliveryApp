"use client";
import { useState } from "react";
import axios from "@/lib/api";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";

export default function CreateStorePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [logo, setImage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "/stores",
        { name, description, address, phone, logo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      router.push("/");
    } catch (err) {
      alert("Ошибка при создании магазина");
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Добавить магазин</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Название"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          type="text"
          placeholder="Адрес"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-xl p-3 transition focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          required
        />
        <input
          type="tel"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-white border border-gray-300 rounded-xl p-3 transition focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          required
        />
        <UploadButton
          appearance={{
            button: "btn-primary",
            allowedContent: "text-sm text-gray-500 mt-2",
          }}
          endpoint="imageUploader"
          onClientUploadComplete={async (res) => {
            const uploadedUrl = res?.[0]?.url;
            if (!uploadedUrl) return;

            setImage(uploadedUrl);
            alert("Upload Completed");
          }}
        />
        <button type="submit" className="btn-primary w-full">
          Добавить магазин
        </button>
      </form>
    </div>
  );
}
