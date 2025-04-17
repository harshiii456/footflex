// models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String, // Or ObjectId if you have a user model
    required: true,
  },
  items: [cartItemSchema],
});

module.exports = mongoose.model('Cart', cartSchema);
