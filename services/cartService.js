// shoe-ecommerce/services/cartService.js
const Cart = require('../models/Cart');

exports.addToCart = async (item, userId) => {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [item] });
  } else {
    const itemIndex = cart.items.findIndex((i) => i.productId.toString() === item.productId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += item.quantity;
    } else {
      cart.items.push(item);
    }
  }
  return cart.save();
};

exports.getCart = async (userId) => {
  return Cart.findOne({ userId }).populate('items.productId');
};

exports.removeFromCart = async (productId, userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) return null;
  cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
  return cart.save();
};