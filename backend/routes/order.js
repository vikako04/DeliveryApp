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

router.post("/", authMiddleware, createOrder);
router.get("/my", authMiddleware, getMyOrders);

router.get("/user/:userId", authMiddleware, getOrdersByUser);

router.get(
  "/admin/all",
  authMiddleware,
  roleMiddleware(["admin"]),
  getAllOrders
);
router.get("/:orderId", authMiddleware, getOrderById);

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
