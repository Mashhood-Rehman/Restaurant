const express = require("express");

const productModel = require("../models/product");
const router = express.Router();
router.post("/productcreate", async (req, res) => {
  try {
    const product = new productModel(req.body);
    await product.save();
    res.status(201).json({ success: true, message: "Product added", product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
router.get("/getProducts/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const products = await productModel.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message, products });
  }
});

module.exports = router;
