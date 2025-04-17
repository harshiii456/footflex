// shoe-ecommerce/controllers/userController.js
const UserService = require('../services/userService');

exports.register = async (req, res) => {
  try {
    const user = await UserService.register(req.body);
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const token = await UserService.login(req.body);
    req.session.userId = token.userId;
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await UserService.getUser(req.session.userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};