// shoe-ecommerce/controllers/orderController.js
const OrderService = require('../services/orderService');

exports.createOrder = async (req, res) => {
  try {
    const order = await OrderService.createOrder(req.body, req.session.userId);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await OrderService.getOrder(req.params.orderId, req.session.userId);
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};