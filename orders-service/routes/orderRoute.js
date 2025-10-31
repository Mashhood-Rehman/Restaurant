const express = require("express")
const router = express.Router();
const {orderCreate, getOrders, updateOrderStatus} = require("../controller/orderController")
const protect = require("../../shared/middleware/authMiddleware")

router.post("/createOrder",protect({required:false}), orderCreate)
router.patch("/updateStatus/:orderId", updateOrderStatus)
router.get("/getOrders", getOrders)

module.exports = router;