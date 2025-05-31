const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: "Failed to create product" });
  }
};

const getProductsByStore = async (req, res) => {
  try {
    const products = await Product.find({ store: req.params.storeId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update product" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.productId);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete product" });
  }
};

module.exports = {
  createProduct,
  getProductsByStore,
  updateProduct,
  deleteProduct,
};
