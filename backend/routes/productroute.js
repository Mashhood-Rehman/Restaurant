const express = require("express");
const {upload} = require("shared");
const {  getAllProducts,
  productcreate,
  getProducts,
  delProducts,
  updateProduct} = require("../controllers/productController")
  const router = express.Router();

  const chatUpload = upload("picture");
  const uploadFile = chatUpload.single("picture");
  
router.post("/productcreate", uploadFile, productcreate);
router.put("/updateProduct/:id",uploadFile, updateProduct);
router.get("/getProducts/:category",getProducts) 
router.get("/getAllProducts",getAllProducts)


router.delete("/deleteProducts/:id", delProducts);
module.exports = router;
