const productModel = require("../models/product");

const productcreate = (req, res) => {
  try {
    const productregister = new productModel({
      name: req.body.name,
      amount: req.body.amount,
      picture: req.body.picture,
      price: req.body.price,
    });
    productregister.save();
    res.status(201).json({
      success: true,
      message: "product created successfully",
      productregister,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: err.message });
  }
};
const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    console.log(products);
    res.status(200).json({ success: true, message: "products fetcheddd" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  productcreate,
  getProducts,
};
