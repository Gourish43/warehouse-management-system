const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.post("/locationreport", (req, res) => {
    const { SlNo,Position,Rack,Floor,PositionType} = req.body;
  
    const sql = "SELECT * FROM  locationreport";
    
    db.query(sql, [ SlNo,Position,Rack,Floor,PositionType], (error, results) => {
      if (error) {
        return res.json("Error");
      }
      return res.json(results);
    });
  });
  module.exports=app;