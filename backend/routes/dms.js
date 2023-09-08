express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.post("/stackerdms", (req, res) => {
    const { SlNo,StackerName,StackerDescription} = req.body;
  
    const sql = "SELECT * FROM  stackerdms";
    
    db.query(sql, [SlNo,StackerName,StackerDescription], (error, results) => {
      if (error) {
        return res.json("Error");
      }
      return res.json(results);
    });
  });
  module.exports=app;