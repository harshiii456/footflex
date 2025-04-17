// shoe-ecommerce/services/productService.js
const Product = require('../models/Product');

exports.getAllProducts = async () => {
  return Product.find();
};

exports.getProductById = async (productId) => {
  return Product.findById(productId);
};