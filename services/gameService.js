// shoe-ecommerce/services/gameService.js
const CouponService = require('./couponService');
const GameResult = require('../models/GameResult');

exports.processGameResults = async (results, userId) => {
  // Logic to determine if the user wins based on results
  const userWon = results.score > 50; // Example win condition
  if (userWon) {
    const discount = Math.floor(Math.random() * (15 - 10 + 1)) + 10;
    const coupon = await CouponService.generateCoupon({
      code: `GAMEWIN${Date.now()}`,
      discount,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Expires in 7 days
    });
    const gameResult = new GameResult({userId: userId, score: results.score});
    await gameResult.save();
    return coupon;
  }
  return null; // User did not win
};