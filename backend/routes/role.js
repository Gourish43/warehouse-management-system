const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());


app.post("/managerole", (req, res) => {
  const { SlNo, RoleName, RoleDescription, RoleDate,RoleTime } = req.body;

  const sql = "SELECT * FROM managerole";
  
  db.query(sql, [SlNo, RoleName, RoleDescription, RoleDate,RoleTime], (error, results) => {
    if (error) {
      return res.json("Error");
    }
    return res.json(results);
  });
});
app.post("/insertrole", (req, res) => {
  const { SlNo, RoleName, RoleDescription, RoleDate,RoleTime } = req.body;

  const sql =
    "INSERT INTO managerole (SlNo, RoleName, RoleDescription, RoleDate,RoleTime) VALUES (?, ?, ?, ?,?)";
  db.query(sql, [SlNo, RoleName, RoleDescription, RoleDate,RoleTime], (error, result) => {
    if (error) {
      return res.json("Error");
    }
    return res.json({
      message: "Record inserted successfully!",
      insertedId: result.insertId,
    });
  });
});


app.put("/updaterole/:SlNo", (req, res) => {
  const SlNo = req.params.SlNo;
  const {  RoleName, RoleDescription, RoleDate,RoleTime} = req.body;

  const sql =
    "UPDATE floorwiseproduct SET RoleName = ?, RoleDescription = ?, RoleDate = ? ,RoleTime=? WHERE SlNo = ?";
  db.query(
    sql,
    [ RoleName, RoleDescription, RoleDate,RoleTime, SlNo],
    (error, result) => {
      if (error) {
        console.error("Error updating product:", error);
        return res.json("Error");
      }
      if (result.affectedRows === 0) {
        return res.json({ message: "Record not found." });
      }
      return res.json({ message: "Record updated successfully!" });
    }
  );
});
module.exports=app;