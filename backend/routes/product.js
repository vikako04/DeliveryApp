const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProductsByStore,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/:storeId", getProductsByStore);

router.post("/", authMiddleware, roleMiddleware(["admin"]), createProduct);
router.put(
  "/:productId",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateProduct
);
router.delete(
  "/:productId",
  authMiddleware,
  roleMiddleware(["admin"]),
  deleteProduct
);

module.exports = router;
