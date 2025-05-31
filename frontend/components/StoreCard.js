/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function StoreCard({ store }) {
  return (
    <Link href={`/products/${store._id}`}>
      <div className="rounded-xl shadow hover:shadow-lg transition-all cursor-pointer">
        <img
          src={store.logo}
          alt={store.name}
          className="h-50 w-full object-cover rounded-t-md mb-1"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{store.name}</h2>
          <p className="text-sm text-gray-600">{store.description}</p>
          <p className="text-sm text-gray-600">
            <i className="pi pi-map-marker mr-1 relative top-[1px]"></i>
            {store.address}
          </p>
          <p className="text-sm text-gray-600">
            <i className="pi pi-phone mr-1 relative top-[1px]"></i>
            {store.phone}
          </p>
          <button className="w-full btn-primary mt-2">Подробнее</button>
        </div>
      </div>
    </Link>
  );
}
