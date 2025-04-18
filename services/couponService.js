// shoe-ecommerce/services/couponService.js
const Coupon = require('../models/Coupon');

exports.applyCoupon = async (couponCode, userId) => {
  const coupon = await Coupon.findOne({ code: couponCode, expiresAt: { $gt: new Date() } });
  if (!coupon) throw new Error('Invalid or expired coupon');
  return coupon.discount;
};

exports.generateCoupon = async (couponData) => {
    const coupon = new Coupon(couponData);
    return coupon.save();
};