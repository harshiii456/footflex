// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Add to cart
router.post('/add', async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const userId = req.session.id; // You can change this to real user ID if logged in

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
    res.redirect('/cart');
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).send('Error adding to cart');
  }
});

// View Cart Page (optional if not already in pageRoutes)
router.get('/', async (req, res) => {
  const userId = req.session.id;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.product');
    res.render('cart', { cart });
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).send('Error loading cart');
  }
});

module.exports = router;
