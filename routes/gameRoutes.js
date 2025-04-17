// shoe-ecommerce/routes/gameRoutes.js
const express = require('express');
const router = express.Router();

// Import the gameController
const gameController = require('../controllers/gameController');

// Define route handlers
router.get('/game', gameController.renderGame); // Rendering the game page
router.post('/game', gameController.handleGamePost); // Handling the POST game data

module.exports = router;
