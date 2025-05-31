const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    address: String,
    phone: String,
    logo: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Store", storeSchema);
