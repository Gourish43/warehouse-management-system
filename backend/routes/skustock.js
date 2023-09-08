express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.post("/skustock", (req, res) => {
    const { SlNo,SkuCode,SkuName,BatchName,BatchQuantity,SkuQuantity,Product} = req.body;
  
    const sql = "SELECT * FROM  skustock";
    
    db.query(sql, [SlNo,SkuCode,SkuName,BatchName,BatchQuantity,SkuQuantity,Product], (error, results) => {
      if (error) {
        return res.json("Error");
      }
      return res.json(results);
    });
  });
  module.exports=app;