const express = require("express")
const router = express.Router();
const {orderCreate} = require("../controller/orderController")
const protect = require("../../auth-service/middleware/authMiddleware")
router.post("/createOrder",protect, orderCreate)