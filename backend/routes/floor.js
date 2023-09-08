// backend/routes/floor.js
const express = require('express');
const router = express.Router();
const db = require('../DbConnection'); // Assuming you have the MySQL database connection here

// Define a route to handle the POST request for adding the selectedCardIndex and area to the Floor table
router.post('/addArea2', (req, res) => {
  const { selectedCardIndex, area } = req.body;

  // Insert the data into the Floor table
  const sql = 'INSERT INTO floor (cardIndex, area) VALUES (?, ?)';
  db.query(sql, [selectedCardIndex, area], (err) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add area to the Floor table' });
    } else {
      res.status(200).json({ message: 'Area added to the Floor table successfully' });
    }
  });
});

module.exports=router;