// shoe-ecommerce/services/orderService.js
const Order = require('../models/Order');
const Cart = require('../models/Cart');

exports.createOrder = async (orderData, userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new Error('Cart not found');
  const order = new Order({ ...orderData, userId, items: cart.items });
  await order.save();
  await Cart.deleteOne({ userId }); // Clear cart after order
  return order;
};

exports.getOrder = async (orderId, userId) => {
  return Order.findOne({ _id: orderId, userId });
};