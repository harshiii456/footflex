// shoe-ecommerce/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3300;

// DB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
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

// Route Imports
const pageRoutes = require('./routes/pages');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const couponRoutes = require('./routes/couponRoutes');
const gameRoutes = require('./routes/gameRoutes');

// Route Usage
app.use('/', pageRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/coupons', couponRoutes);
app.use('/game', gameRoutes);

// ✅ Fixed: Replace 404 render with plain response
app.use((res) => {
  res.status(404).send('Page Not Found');

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
