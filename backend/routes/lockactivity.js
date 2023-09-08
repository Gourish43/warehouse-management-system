const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const ExcelJS = require("exceljs");

app.post("/lockactivity", (req, res) => {
     const { SlNo,FloorName,FloorDescription,AreaName,AreaDescription,LockActivity,LockStartDate,LockStartTime,LockEndDate,LockEndTime,LockUserName,UnlockUserName} = req.body;

  const sql = "SELECT * FROM lockactivity";
  
  db.query(sql, [SlNo,FloorName,FloorDescription,AreaName,AreaDescription,LockActivity,LockStartDate,LockStartTime,LockEndDate,LockEndTime,LockUserName,UnlockUserName ], (error, results) => {
    if (error) {
      return res.json("Error");
    }
    return res.json(results);
  });
});
app.get("/exportExcel", (req, res) => {
  const sql = "SELECT * FROM lockactivity";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Error fetching data" });
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("LockActivity");

      // Add table headers
      worksheet.columns = [
        { header: "SlNo", key: "SlNo" },
        { header: "FloorName", key: "FloorName" },
        { header: "Floor Description", key: "FloorDescription" },
        { header: "AreaName", key: "AlarmName" },
        { header: "AreaDescription", key: "AreaDescription" },
        { header: "LockComments", key: "LockComments" },
        { header: "LockActivity", key: "LockActivity" },
        { header: "LockStartDate", key: "LockStartDate" },
        { header: "LockStartTime", key: "LockStartTime" },
        { header: "LockEndTime", key: "LockEndTime" },
        { header: "LockUserName", key: "LockUserName" },
        { header: "UnlockUserName", key: "UnlockUserName" },
      ];

      // Add data rows
      results.forEach((row) => {
        worksheet.addRow(row);
      });

      // Set response headers for file download
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=LockActivity.xlsx"
      );

      // Write the workbook to the response stream
      workbook.xlsx.write(res).then(() => {
        res.end();
      });
    } catch (error) {
      console.error("Error exporting Excel:", error);
      return res.status(500).json({ error: "Error exporting Excel" });
    }
  });
});
module.exports=app;