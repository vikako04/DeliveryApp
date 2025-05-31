/* eslint-disable @next/next/no-img-element */
export default function OrderCard({ order }) {
  const date = new Date(order.createdAt).toLocaleString("ru-RU");

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between mb-2 text-sm text-gray-500">
        <span>Заказ #{order._id.slice(-6).toUpperCase()}</span>
        <span>{date}</span>
      </div>

      <div className="space-y-3">
        {order.items.map(({ product, quantity }) => (
          <div key={product._id} className="flex items-center gap-4">
            <img
              src={product.image || "/product-placeholder.png"}
              alt={product.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-medium">{product.name}</p>

              <p className="text-sm text-gray-600">
                <span className="bi bi-fork-knife mr-1"></span>
                {product.category}
              </p>
              <p className="text-sm text-gray-600">
                <i className="pi pi-wallet mr-2"></i>
                {quantity} × {product.price} Tg
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p className="font-semibold text-lg">
          Сумма:{" "}
          <span className="">
            {order.items.reduce(
              (sum, item) => sum + item.product.price * item.quantity,
              0
            )}{" "}
            Tg
          </span>
        </p>
        <span
          className={`px-3 py-1 text-sm rounded-full ${
            order.status === "delivered"
              ? "bg-green-100 text-green-700"
              : order.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {order.status === "pending"
            ? "Ожидается"
            : order.status === "in_delivery"
            ? "В пути"
            : "Доставлен"}
        </span>
      </div>

      <p className="text-sm text-gray-500 mt-1">
        <i className="pi pi-map-marker mr-1 relative top-[1px]"></i>
        Адрес доставки: {order.address}
      </p>
    </div>
  );
}
