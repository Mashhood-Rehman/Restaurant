const userModel = require("../models/user");
const bcrypt = require("bcrypt")
const usercreate = async (req, res) => {
    const hashpassword = await bcrypt.hash(req.body.password, 12)
  try {
    const userregister = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: hashpassword,
    });
    await userregister.save();
    res.status(201).json({
      success: true,
      message: "Account created successfully!",
      userregister,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const getuser = async (req, res) => {
  try {
    const user = await userModel.find();
    res
      .status(201)
      .json({ success: true, message: "user fetched successfully", user });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error occured while fetching users",
      err: err,
    });
  }
};
// const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     if(!email && password) {}
//   } catch (error) {

//   }
// };
module.exports = { usercreate, getuser };
