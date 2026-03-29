const express = require("express");
const { createUser, getAllUsers, updateUserById, deleteUserById, getMe, getAllCustomers, updateDriverLocation } = require("../controllers/userController");
const { upload } = require("shared");
const { protect } = require("shared");

const userUpload = upload("userProfiles");
const router = express.Router();
const uploadProfileImage = userUpload.single("profileImg")
router.post("/createUser", createUser);
router.get("/getAllUsers", protect(), getAllUsers);
router.get("/getMe", protect(), getMe);
router.get("/getAllCustomers", protect(), getAllCustomers);
router.put("/updateuserbyid/:id", protect(), uploadProfileImage, updateUserById);
router.delete("/deleteUserById/:id", protect(), deleteUserById);
router.put("/updateDriverLocation", protect(), updateDriverLocation);

module.exports = router;
