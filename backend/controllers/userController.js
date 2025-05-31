const User = require("../models/User");

const getCouriers = async (req, res) => {
  try {
    const couriers = await User.find({ role: "courier" }).select("name email");
    res.json(couriers);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getCouriers,
};
