const express = require("express");
const router = express.Router();
const { usercreate, getuser } = require("../controllers/userController");
router.post("/usercreate", usercreate);
router.post("/getuser", getuser);
module.exports = router;
