/* eslint-disable @next/next/no-img-element */
import { useCart } from "@/app/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.name}
        className="h-50 w-full object-cover rounded-t-md mb-1"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{product.name}</h2>

        <p className="text-sm text-gray-600">
          <i className="bi bi-fork-knife mr-1"></i>
          {product.category}
        </p>
        <p className="text-sm text-gray-600">
          <i className="pi pi-info-circle mr-1 relative top-[1px]"></i>
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl">
            {product.price}
            <i className="pi pi-wallet ml-2 relative top-[1px]"></i>
          </span>
          <button
            onClick={() => {
              console.log("Нажали добавить товар", product._id);
              addToCart(product);
            }}
            className="w-fit btn-primary"
          >
            <i className="pi pi-plus mr-1 relative top-[1px]"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
