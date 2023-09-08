const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.post("/usersdata", (req, res) => {
    const { SlNo,UserName,Name,Gender,EmailId,ContactNo} = req.body;
  
    const sql = "SELECT * FROM usersdata";
    
    db.query(sql, [SlNo,UserName,Name,Gender,EmailId,ContactNo], (error, results) => {
      if (error) {
        return res.json("Error");
      }
      return res.json(results);
    });
  });
  app.post("/insertUser", (req, res) => {
    const { SlNo,UserName,Name,Gender,EmailId,ContactNo } = req.body;
  
    const sql =
      "INSERT INTO usersdata (SlNo,UserName,Name,Gender,EmailId,ContactNo) VALUES (?, ?, ?, ?,?,?)";
    db.query(sql, [SlNo,UserName,Name,Gender,EmailId,ContactNo], (error, result) => {
      if (error) {
        return res.json("Error");
      }
      return res.json({
        message: "Record inserted successfully!",
        insertedId: result.insertId,
      });
    });
  });
  
  app.delete("/deleteUser/:SlNo", (req, res) => {
    const SlNo = req.params.SlNo;
  
    const sql = "DELETE FROM usersdata WHERE SlNo = ?";
  
    db.query(sql, [SlNo], (error, result) => {
      if (error) {
        return res.json("Error");
      }
      if (result.affectedRows === 0) {
        return res.json({ message: "Record not found." });
      }
      return res.json({ message: "Record deleted successfully!" });
    });
  });
  
  app.put("/updateUser/:SlNo", (req, res) => {
    const SlNo = req.params.SlNo;
    const { UserName,Name,Gender,EmailId,ContactNo } = req.body;
  
    const sql =
      "UPDATE usersdata SET UserName= ?, Name = ?, Gender = ? ,EmailId=?, ContactNo =? WHERE SlNo = ?";
    db.query(
      sql,
      [UserName,Name,Gender,EmailId, ContactNo, SlNo],
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