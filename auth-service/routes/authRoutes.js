const express = require("express");
const { Login, Signup, logout } = require("../controllers/authController");
const protect = require("../../shared/middleware/authMiddleware");
const router = express.Router();
const loginReq = (req,res,next) => {
    try {
        console.log("API ROUTE HIT FROM HERE")
        
        next();
    } catch (error) {
        console.log("Error in loginReq middleware:", error);
    }
}
router.post("/login",loginReq, Login);
router.post("/logout", protect, logout);
router.post("/signup", Signup);

module.exports = router;
