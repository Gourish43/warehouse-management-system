const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.post("/managesku", (req, res) => {
    const { SlNo,SkuName,SkuDescription,SkuCode,AverageQuantity,ProductName,SkuDate,SkuTime} = req.body;
  
    const sql = "SELECT * FROM  managesku";
    
    db.query(sql, [SlNo,SkuName,SkuDescription,SkuCode,AverageQuantity,ProductName,SkuDate,SkuTime], (error, results) => {
      if (error) {
        return res.json("Error");
      }
      return res.json(results);
    });
  });
  module.exports=app;