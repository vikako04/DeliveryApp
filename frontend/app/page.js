"use client";
import { useEffect, useState } from "react";
import axios from "@/lib/api";
import StoreCard from "@/components/StoreCard";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function HomePage() {
  const [stores, setStores] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios.get("stores").then((res) => setStores(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-5">Доступные магазины</h1>
      {user?.role === "admin" && (
        <div className="btn-primary w-fit mb-5">
          <Link href="/stores/create">Добавить магазин</Link>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stores.map((store) => (
          <StoreCard key={store._id} store={store} />
        ))}
      </div>
    </div>
  );
}
