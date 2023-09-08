const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.post("/dmsposition", (req, res) => {
    const { SlNo,PositionTagName,PositionTagDescription,PositonId,PreviousPositionId,LiveId} = req.body;
  
    const sql = "SELECT * FROM  dmsposition";
    
    db.query(sql, [SlNo,PositionTagName,PositionTagDescription,PositonId,PreviousPositionId,LiveId], (error, results) => {
      if (error) {
        return res.json("Error");
      }
      return res.json(results);
    });
  });
  module.exports=app;