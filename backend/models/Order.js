const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courier: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    totalPrice: Number,
    status: {
      type: String,
      enum: ["pending", "accepted", "preparing", "on_the_way", "delivered"],
      default: "pending",
    },
    address: String,
    paymentMethod: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
