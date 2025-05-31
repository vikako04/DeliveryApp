const express = require("express");
const router = express.Router();
const { getCouriers } = require("../controllers/userController");

router.get("/couriers", getCouriers); // 👈 есть ли это?

module.exports = router;
