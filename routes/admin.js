// admin.js
const express = require('express');
const router = express.Router();
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware'); // Importing middleware
const Product = require('../models/Product'); // Your Product model

// Route to show the Add Product form
router.get('/add-product', authenticateToken, isAdmin, (req, res) => {
  res.render('admin/add-product'); // Render the Add Product page
});

// Route to handle the Add Product form submission
router.post('/add-product', authenticateToken, isAdmin, async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      image,
    });

    await newProduct.save();
    res.redirect('/admin/products'); // Redirect after adding the product
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).send('Failed to add product');
  }
});

module.exports = router;
