// shoe-ecommerce/controllers/cartController.js
const CartService = require('../services/cartService');

exports.addToCart = async (req, res) => {
  try {
    const cart = await CartService.addToCart(req.body, req.session.userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await CartService.getCart(req.session.userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const cart = await CartService.removeFromCart(req.params.productId, req.session.userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};