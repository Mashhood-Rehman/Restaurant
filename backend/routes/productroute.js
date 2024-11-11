const express = require("express");
const upload = require("../multerConfig");
const {  getAllProducts,
  productcreate,
  getProducts,
  delProducts} = require("../controllers/productController")
  const router = express.Router();

  router.post("/productcreate", upload.single('picture'), productcreate);

router.get("/getProducts/:category",getProducts) 
router.get("/getAllProducts",getAllProducts)


router.delete("/deleteProducts/:id", delProducts);
module.exports = router;
