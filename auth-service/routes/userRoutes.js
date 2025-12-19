    // userRoutes.js
    const express = require("express");
    const { createUser, getAllUsers, updateUserById, deleteUserById, getMe, getAllCustomers } = require("../controllers/userController");
    const {protect} = require("shared");
    const uploadMiddleware = require("../middleware/uploadMiddleware");
    const router = express.Router();

    const userUpload = uploadMiddleware("userProfiles");

    const uploadProfileImage = userUpload.single("profileImg")
    router.post("/createUser", createUser);
    router.get("/getAllUsers", getAllUsers);
    router.get("/getMe", protect(), getMe);
    router.get("/getAllCustomers", getAllCustomers);
    router.patch("/updateuserbyid/:id", uploadProfileImage, updateUserById);
    router.delete("/deleteUserById/:id", deleteUserById);

    module.exports = router;
