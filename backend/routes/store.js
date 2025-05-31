const express = require("express");
const router = express.Router();
const { createStore, getAllStores } = require("../controllers/storeController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", getAllStores);
router.post("/", authMiddleware, roleMiddleware(["admin"]), createStore);

module.exports = router;
