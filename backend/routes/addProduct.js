const express = require('express');
const router = express.Router();
const db = require('../DbConnection');

router.post('/addProd', (req, res) => {
  const {
    quantity,
    skuName,
    skuCode,
    batchNumber,
    productionOrderNo,
    productName,
    palletCode,
    status,
    loadDate,
  } = req.body;
  const selectedCardIndex = req.body.selectedCardIndex; // Get the selectedCardIndex from the request body

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

    // If the selectedCardIndex exists, proceed with counting the existing products for the card index
    const countProductsQuery = 'SELECT COUNT(*) AS productCount FROM tbl_addprod WHERE cardIndex = ?';
    db.query(countProductsQuery, [selectedCardIndex], (err, results) => {
      if (err) {
        // If there's an error while querying the database, send an error response
        console.error('Error counting products:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const productCount = results[0].productCount;
      if (productCount >= 2) {
        // If the product count exceeds 12, return an error indicating that the inventory is full
        return res.status(400).json({ error: 'Inventory is full. Cannot add more products.' });
      }

      // If the product count is less than 12, proceed with inserting the product data into the database
      const insertProductQuery =
        'INSERT INTO tbl_addprod (quantity, skuName, skuCode, batchNumber, productionOrderNo, productName, palletCode, status, loadDate, cardIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      db.query(
        insertProductQuery,
        [
          quantity,
          skuName,
          skuCode,
          batchNumber,
          productionOrderNo,
          productName,
          palletCode,
          status,
          loadDate,
          selectedCardIndex,
        ],
        (err) => {
          if (err) {
            // If there's an error while inserting the product, send an error response
            console.error('Error adding product:', err);
            return res.status(500).json({ error: 'Error adding product' });
          }

          res.status(200).json({ message: 'Product added successfully' });
        }
      );
    });
  });
});

module.exports=router;

//after adding 12 product, islocked -> true
//after unload  -> islocked- false
//lock symbol
//unload-> + log details & status-dispatch