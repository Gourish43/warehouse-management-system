const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.post("/stockdispatch", (req, res) => {
    const { SlNo,PositionRow,PalletCode,SkuCode,Sku,Product,PoNo,BatchNo,Quantity,Floor,Area,Rackcolumn,Rack,Position,LoadDate,LoadTime} = req.body;
  
    const sql = "SELECT * FROM  stockdispatch";
    
    db.query(sql, [SlNo,PositionRow,PalletCode,SkuCode,Sku,Product,PoNo,BatchNo,Quantity,Floor,Area,Rackcolumn,Rack,Position,LoadDate,LoadTime], (error, results) => {
      if (error) {
        return res.json("Error");
      }
      return res.json(results);
    });
  });
module.exports=app;