// shoe-ecommerce/controllers/gameController.js
const GameService = require('../services/gameService');

// Function to handle the game results
exports.processGameResults = async (req, res) => {
  try {
    const coupon = await GameService.processGameResults(req.body.results, req.session.userId);
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to render the game page
const renderGame = (req, res) => {
  res.render('game'); // Ensure it's 'game', not 'pages/game'
};

// Function to handle the POST request for game data (example for game logic)
const handleGamePost = (req, res) => {
  // Add your game logic for handling POST requests here
  console.log(req.body); // For example, log the game data
  res.status(200).send('Game data processed');
};

module.exports = { renderGame, handleGamePost };
