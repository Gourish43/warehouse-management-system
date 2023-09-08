const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());


app.post("/bayoutfeed", (req, res) => {
  const { SlNo, TruckPositionName, ZotbNumber, TruckNumber,TruckInPresence,	LoadingStatus,TelescopicConveyorStatus,LoadingDateandTime,LoadingBayFixedPallet,LoadingBayCurrentPallet} = req.body;

  const sql = "SELECT * FROM bayoutfeedpallet";
  
  db.query(sql, [SlNo, TruckPositionName, ZotbNumber, TruckNumber,TruckInPresence,	LoadingStatus,TelescopicConveyorStatus,LoadingDateandTime,LoadingBayFixedPallet,LoadingBayCurrentPallet], (error, results) => {
    if (error) {
      return res.json("Error");
    }
    return res.json(results);
  });
});

app.put("/updatebayoutfeed/:SlNo", (req, res) => {
  const SlNo = req.params.SlNo;
  const {TruckPositionName, ZotbNumber, TruckNumber,TruckInPresence,	LoadingStatus,TelescopicConveyorStatus,LoadingDateandTime,LoadingBayFixedPallet,LoadingBayCurrentPallet} = req.body;

  const sql =
    "UPDATE bayoutfeedpallet SET TruckPositionName=?, ZotbNumber=?, TruckNumber=?,TruckInPresence=?,LoadingStatus=?,TelescopicConveyorStatus=?,LoadingDateandTime=?,LoadingBayFixedPallet=?,LoadingBayCurrentPallet=? WHERE SlNo = ?";
  db.query(
    sql,
    [  TruckPositionName, ZotbNumber, TruckNumber,TruckInPresence,LoadingStatus,TelescopicConveyorStatus,LoadingDateandTime,LoadingBayFixedPallet,LoadingBayCurrentPallet,SlNo],
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