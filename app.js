// shoe-ecommerce/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');

// Route files
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const couponRoutes = require('./routes/couponRoutes');
const gameRoutes = require('./routes/gameRoutes');
const pageRoutes = require('./routes/pages'); // ✅ REQUIRED!

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3300;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// View Engine Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Routes for APIs
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/coupons', couponRoutes);
app.use('/game', gameRoutes);

// ✅ Routes for Pages (EJS Views)
app.use('/', pageRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).render('404'); // Optional: create views/404.ejs
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
