const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const ExcelJS = require("exceljs");

app.post("/loggeractivity", (req, res) => {
     const { SlNo,ModuleName,LogMessage,LogUserName,LogDate,LogTime} = req.body;

  const sql = "SELECT * FROM loggeractivity";
  
  db.query(sql, [SlNo,ModuleName,LogMessage,LogUserName,LogDate,LogTime ], (error, results) => {
    if (error) {
      return res.json("Error");
    }
    return res.json(results);
  });
});
app.get("/exportExcel", (req, res) => {
  const sql = "SELECT * FROM loggeractivity";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Error fetching data" });
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("LoggerActivity");

      // Add table headers
      worksheet.columns = [
        { header: "SlNo", key: "SlNo" },
        { header: "ModuleName", key: "ModuleName" },
        { header: "	LogMessage", key: "	LogMessage" },
        { header: "LogUserName", key: "LogUserName" },
        { header: "	LogDate", key: "	LogDate" },
        { header: "	LogTime", key: "	LogTime" }, ];

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
        "attachment; filename=LoggerActivity.xlsx"
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