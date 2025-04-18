// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add to cart
router.post('/add', async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.session.id; // You may need to adjust if you're using a real user model

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.product.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += parseInt(quantity);
    } else {
      // Add new product
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    // Respond with success
    res.json({ success: true, message: 'Product added to cart' });
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ success: false, message: 'Error adding to cart' });
  }
});

module.exports = router;
