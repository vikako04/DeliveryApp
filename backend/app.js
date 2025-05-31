const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);
// Middleware
app.use(cors());
app.use(express.json());

const { getCouriers } = require("./controllers/userController");
app.get(
  "/api/users/couriers",
  authMiddleware,
  roleMiddleware(["admin"]),
  getCouriers
);

// Routes (подключим позже)
app.get("/", (req, res) => res.send("API is running"));

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/user");
app.use("/api/users", userRoutes);

const storeRoutes = require("./routes/store");
app.use("/api/stores", storeRoutes);

const productRoutes = require("./routes/product");
app.use("/api/products", productRoutes);

const orderRoutes = require("./routes/order");
app.use("/api/orders", orderRoutes);

// WebSocket (будет реализован позже)

module.exports = { app, server };
