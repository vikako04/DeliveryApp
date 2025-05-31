const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  assignCourier,
  getAllOrders,
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Создание заказа (любой пользователь)
router.post("/", authMiddleware, createOrder);
router.get("/my", authMiddleware, getMyOrders); // ✅ вот эта строка

// Получение заказов конкретного пользователя (админ или сам пользователь)
router.get("/user/:userId", authMiddleware, getOrdersByUser);

router.get(
  "/admin/all",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAllOrders
); // до :orderId!
// Получение одного заказа
router.get("/:orderId", authMiddleware, getOrderById);

// Обновление статуса заказа (только админ или курьер)
router.patch(
  "/:orderId/status",
  authMiddleware,
  roleMiddleware(["admin", "courier"]),
  updateOrderStatus
);

router.patch(
  "/:orderId/assign",
  authMiddleware,
  roleMiddleware(["admin"]),
  assignCourier
);
module.exports = router;
