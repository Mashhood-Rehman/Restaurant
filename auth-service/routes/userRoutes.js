// userRoutes.js
const express = require("express");
const { createUser, getAllUsers, updateUserById, deleteUserById, getMe, getAllCustomers } = require("../controllers/userController");
const protect = require("../../shared/middleware/authMiddleware");  
const router = express.Router();

router.post("/createUser", createUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getMe", protect, getMe);
router.get("/getAllCustomers", getAllCustomers);
router.patch("/updateuserbyid/:id", updateUserById);
router.delete("/deleteUserById/:id", deleteUserById);

module.exports = router;
