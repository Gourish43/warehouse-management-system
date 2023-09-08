const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.post("/manageproduct", (req, res) => {
    const { SlNo,ProductName,ProductDescription} = req.body;
  
    const sql = "SELECT * FROM manageproduct";
    
    db.query(sql, [SlNo,ProductName,ProductDescription], (error, results) => {
      if (error) {
        return res.json("Error");
      }
      return res.json(results);
    });
  });
  app.post("/insertProduct", (req, res) => {
    const {SlNo,ProductName,ProductDescription } = req.body;
  
    const sql =
      "INSERT INTO manageproduct (SlNo,ProductName,ProductDescription) VALUES (?, ?, ?)";
    db.query(sql, [SlNo,ProductName,ProductDescription], (error, result) => {
      if (error) {
        return res.json("Error");
      }
      return res.json({
        message: "Record inserted successfully!",
        insertedId: result.insertId,
      });
    });
  });
  
  app.delete("/deleteProduct/:SlNo", (req, res) => {
    const SlNo = req.params.SlNo;
  
    const sql = "DELETE FROM manageproduct WHERE SlNo = ?";
  
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
  
  app.put("/updateProduct/:SlNo", (req, res) => {
    const SlNo = req.params.SlNo;
    const { ProductName,ProductDescription } = req.body;
  
    const sql =
      "UPDATE manageproduct SET ProductName=?,ProductDescription=? WHERE SlNo = ?";
    db.query(
      sql,
      [ProductName,ProductDescription, SlNo],
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