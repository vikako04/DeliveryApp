"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useAuth } from "@/lib/auth";

export default function StoreProductsPage() {
  const { storeId } = useParams();
  const { user } = useAuth();

  console.log("storeId:", storeId);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!storeId) return;

    axios.get(`products/${storeId}`).then((res) => setProducts(res.data));
  }, [storeId]);
  console.log(products);

  return (
    <div>
      <h1 className="text-xl font-semibold mb-6">Товары магазина</h1>
      {user?.role === "admin" && (
        <div className="btn-primary w-fit mb-5">
          <Link href={`/products/create?storeId=${storeId}`}>
            Добавить товар
          </Link>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
