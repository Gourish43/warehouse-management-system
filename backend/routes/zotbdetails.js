const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.post("/zotb", (req, res) => {
    const { SlNo,ZotbNumber,TruckNumber,ZotbDispatchStartDate,ZotbDispatchStartTime,Status} = req.body;
  
    const sql = "SELECT * FROM  zotbdetails";    
    db.query(sql, [SlNo,ZotbNumber,TruckNumber,ZotbDispatchStartDate,ZotbDispatchStartTime,Status], (error, results) => {
      if (error) {
        return res.json("Error");
      }
      return res.json(results);
    });
  });
  module.exports=app;