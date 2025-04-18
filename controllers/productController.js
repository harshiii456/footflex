// shoe-ecommerce/controllers/productController.js
const ProductService = require('../services/productService');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.productId);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};