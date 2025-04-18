const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Show all products on the shop page
router.get('/shop', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('shop', { products });
    } catch (err) {
        console.log('Error fetching products:', err);
        res.status(500).send('Error fetching products');
    }
});

module.exports = router;
