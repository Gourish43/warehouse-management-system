const express = require('express');
const router = express.Router();
const db = require('../DbConnection'); 

// Route to handle the DELETE request to delete data from the tbl_addprod table
router.delete('/deleteProd/:selectedCardIndex', (req, res) => {
  try {
    const { selectedCardIndex } = req.params;

    const checkCardIndexQuery = 'SELECT cardIndex FROM floor WHERE cardIndex = ?';
    db.query(checkCardIndexQuery, [selectedCardIndex], (err, results) => {
      if (err) {
        // If there's an error while querying the database, send an error response
        console.error('Error checking cardIndex:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (results.length === 0) {
        // If the selectedCardIndex does not exist in the referenced table, return an error
        return res.status(400).json({ error: 'Invalid selectedCardIndex' });
      }

    // Perform the database query to delete the data from tbl_addprod table
    const deleteQuery = 'DELETE FROM tbl_addprod WHERE cardIndex = ?';
    db.query(deleteQuery, [selectedCardIndex]);

    res.json({ message: 'Data deleted successfully.' });
    });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;