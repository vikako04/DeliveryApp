const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "courier", "admin"],
      default: "customer",
    },
    address: String,
    phone: String,
    avatar: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
