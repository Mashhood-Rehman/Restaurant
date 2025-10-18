// userRoutes.js
const express = require("express");
const { createUser, getAllUsers, updateUserById, deleteUserById, getMe } = require("../controllers/userController");
const protect = require("../../shared/middleware/authMiddleware");  // ← no curly braces
const router = express.Router();

router.post("/createUser", createUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getMe", protect, getMe);
router.patch("/updateuserbyid/:id", updateUserById);
router.delete("/deleteUserById/:id", deleteUserById);

module.exports = router;
