express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.post("/accesscontrol", (req, res) => {
    const { SlNo,ModuleName,Admin,Planner,Dock} = req.body;
  
    const sql = "SELECT * FROM  manageaccesscontrol";
    
    db.query(sql, [SlNo,ModuleName,Admin,Planner,Dock], (error, results) => {
      if (error) {
        return res.json("Error");
      }
      return res.json(results);
    });
  });
  module.exports=app;