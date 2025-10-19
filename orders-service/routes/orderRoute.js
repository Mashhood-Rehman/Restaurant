const express = require("express")
const router = express.Router();
const {orderCreate, getOrders} = require("../controller/orderController")
const protect = require("../../shared/middleware/authMiddleware")

router.post("/createOrder",protect({required:false}), orderCreate)
router.get("/getOrders", getOrders)

module.exports = router;