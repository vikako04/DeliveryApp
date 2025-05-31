const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      customer: req.user.userId,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: "Failed to create order" });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.userId }).populate(
      "items.product"
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Админ видит всё, пользователь — только свои
    if (req.user.role !== "admin" && req.user.userId !== userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const orders = await Order.find({ customer: userId }).populate(
      "items.product"
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate("items.product")
      .populate("customer", "name email")
      .populate("courier", "name email");

    if (!order) return res.status(404).json({ error: "Order not found" });

    // Пользователь может видеть только свой заказ
    if (
      req.user.role !== "admin" &&
      req.user.userId !== String(order.customer._id)
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    )
      .populate("items.product")
      .populate("customer")
      .populate("courier");

    const io = req.app.get("io");
    io.emit("orderUpdated", order); // 🔴 broadcast обновление заказа

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: "Failed to update order status" });
  }
};

const assignCourier = async (req, res) => {
  try {
    const { courierId } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      {
        courier: courierId,
        status: "in_transit",
      },
      { new: true }
    )
      .populate("items.product")
      .populate("customer")
      .populate("courier");

    const io = req.app.get("io");
    io.emit("orderUpdated", order); // 🔴

    res.json(order);
  } catch (err) {
    res.status(400).json({ error: "Failed to assign courier" });
  }
};
const getAllOrders = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const orders = await Order.find()
      .populate("items.product")
      .populate("customer", "name email")
      .populate("courier", "name email");

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  assignCourier,
  getAllOrders,
};
