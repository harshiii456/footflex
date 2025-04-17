// shoe-ecommerce/services/userService.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const user = new User({ ...userData, password: hashedPassword });
  return user.save();
};

exports.login = async (loginData) => {
  const user = await User.findOne({ email: loginData.email });
  if (!user || !(await bcrypt.compare(loginData.password, user.password))) {
    throw new Error('Invalid credentials');
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  return { token, userId: user._id };
};

exports.getUser = async (userId) => {
  return User.findById(userId);
};