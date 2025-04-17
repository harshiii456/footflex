// shoe-ecommerce/controllers/couponController.js
const CouponService = require('../services/couponService');

exports.applyCoupon = async (req, res) => {
  try {
    const discount = await CouponService.applyCoupon(req.body.couponCode, req.session.userId);
    res.json({ discount });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.generateCoupon = async (req, res) => {
    try {
        const coupon = await CouponService.generateCoupon(req.body);
        res.json(coupon);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};