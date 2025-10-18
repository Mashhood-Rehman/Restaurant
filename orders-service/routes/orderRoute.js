const express = require("express")
const router = express.Router();
const {orderCreate} = require("../controller/orderController")
const protect = require("../../shared/middleware/authMiddleware")

router.post("/createOrder",protect, orderCreate)

module.exports = router;