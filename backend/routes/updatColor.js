const express = require('express');
const bodyParser = require('body-parser');
const app = express.Router();
const db= require('../DbConnection');


// Middleware to parse incoming request data
app.use(bodyParser.json());

// Sample data for card colors (you might store this in a database in a real application)
let cardColors = new Array(432).fill('white');

// Update card color on the server
app.post('/updateCardColor', (req, res) => {
  const { cardIndex, color } = req.body;

  if (cardIndex >= 0 && cardIndex < 432) {
    // Update the card color in the server data
    cardColors[cardIndex] = color;

    // Respond with a success message
    res.status(200).json({ message: 'Card color updated on the server.' });
  } else {
    // Respond with an error message for invalid cardIndex
    res.status(400).json({ message: 'Invalid cardIndex provided.' });
  }
});

module.exports= app;