const express = require("express");
const { Login, Signup, logout } = require("../controllers/authController");
const {protect} = require("shared");  

const router = express.Router();

router.post("/login", Login);
router.post("/logout", protect(), logout);
router.post("/signup", Signup);

module.exports = router;
