const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateToken, isAdmin } = require('../middleware/authMiddleware');

// ==========================
// Static Page Routes
// ==========================

// Home Page
router.get('/', (req, res) => res.render('home'));

// About Page
router.get('/about', (req, res) => res.render('about'));

// Game Page
router.get('/game', (req, res) => res.render('game'));

// ✅ Contact Page
router.get('/contact', (req, res) => {
  console.log("Contact route triggered");
  try {
    res.render('contact');
  } catch (err) {
    console.error("Error rendering contact:", err);
    res.status(500).send("Failed to render contact page.");
  }
});

// ==========================
// Authentication Routes
// ==========================

// Signup
router.get('/signup', (req, res) => res.render('signup'));
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.redirect('/login');
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).send('Signup failed');
  }
});

// Login
router.get('/login', (req, res) => res.render('login'));
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send('Invalid email or password');

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/');
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).send('Login failed');
  }
});

// ==========================
// Cart & Checkout Routes
// ==========================
router.get('/cart', (req, res) => res.render('cart'));
router.get('/checkout', (req, res) => res.render('checkout'));
router.post('/checkout', (req, res) => res.redirect('/orders'));

// ==========================
// Product Shop Routes
// ==========================
router.get('/shop', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('shop', { products });
  } catch (err) {
    console.error('Error loading products:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Add Product (Admin only)
router.get('/add-product', authenticateToken, isAdmin, (req, res) => {
  res.render('add-product');
});

router.post('/add-product', authenticateToken, isAdmin, async (req, res) => {
  const { name, description, price, image } = req.body;

  const newProduct = new Product({ name, description, price, image });

  try {
    await newProduct.save();
    res.redirect('/shop');
  } catch (err) {
    console.error('Error adding product:', err);
    res.status(500).send('Error adding product');
  }
});

// Product Detail Page
router.get('/product/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send('Product not found');
    res.render('product-detail', { product });
  } catch (err) {
    console.error('Product detail error:', err);
    res.status(500).send('Something went wrong');
  }
});

module.exports = router;