// shoe-ecommerce/routes/couponRoutes.js
const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');

router.post('/apply', couponController.applyCoupon);
router.post('/generate', couponController.generateCoupon);

module.exports = router;