const productModel = require("../models/product");


const productcreate = async (req, res) => {
  try {
    const { name, price, amount, category, description } = req.body;

    let pictureData = {};
    if (req.file) {
      pictureData = {
        picture: req.file.path,
        picturePublicId: req.file.filename,
      };
    }

    const productregister = new productModel({
      name,
      price,
      stock: amount,
      amount,
      category,
      description,
      ...pictureData,
    });

    await productregister.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: productregister,
    });

  } catch (error) {
    console.error("Product create error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to create product",
      error: error.message || error,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ success: true, message: "products fetcheddd", products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json({ success: true, message: " All products fetcheddd", products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, amount, category, description } = req.body;

    const updateData = { name, price, stock: amount, amount, category, description };

    if (req.file) {
      updateData.picture = req.file.path;
      updateData.picturePublicId = req.file.filename;
    }

    const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: `Product with id ${id} not found` });
    }

    res.status(200).json({ success: true, message: "Product updated successfully", updatedProduct });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ success: false, message: "Unable to update product", error: error.message });
  }
};



const delProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: `Product with id ${id} not found` });
    }

    res.status(200).json({
      success: true,
      message: `Product with id ${id} has been deleted successfully`,
      deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to delete product", error: error.message || error });
  }
};

module.exports = {
  getAllProducts,
  productcreate,
  getProducts,
  updateProduct,
  delProducts
};
