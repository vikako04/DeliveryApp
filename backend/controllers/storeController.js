const Store = require("../models/Store");

const createStore = async (req, res) => {
  try {
    const store = await Store.create(req.body);
    res.status(201).json(store);
  } catch (err) {
    res.status(400).json({ error: "Failed to create store" });
  }
};

const getAllStores = async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createStore, getAllStores };
