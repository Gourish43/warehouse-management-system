const express = require('express');
const router = express.Router();
const db = require('../DbConnection');

// Define a new route to handle the GET request for fetching data from tbl_addprod
router.get('/getProdData/:selectedCardIndex', (req, res) => {
    const { selectedCardIndex } = req.params;
  
    // First, check if the selectedCardIndex exists in the referenced table (e.g., 'Floor') to ensure data integrity
    // You need to update the table name and primary key column name accordingly
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
  
      // If the selectedCardIndex exists, proceed with querying the tbl_addprod table
      const selectProductQuery = 'SELECT id,quantity,skuName,skuCode,batchNumber,productionOrderNo,productName,palletCode,status,loadDate FROM tbl_addprod WHERE cardIndex = ?';
      db.query(selectProductQuery, [selectedCardIndex], (err, results) => {
        if (err) {
          // If there's an error while querying the database, send an error response
          console.error('Error fetching product data:', err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        // Send the fetched data as the response
        res.status(200).json(results);
      });
    });
  });
  
  module.exports=router;
