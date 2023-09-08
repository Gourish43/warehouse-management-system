const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const ExcelJS = require("exceljs");

app.post("/skuwisedispatch", (req, res) => {
  const { SlNo,Product,SkuCode,SkuDescription,InfeedCount,MonthlyInfeed,Dispatch,MonthlyDispatch,Date} = req.body;

  const sql = "SELECT * FROM skuwisedispatch";
  
  db.query(sql, [SlNo,Product,SkuCode,SkuDescription,InfeedCount,MonthlyInfeed,Dispatch,MonthlyDispatch,Date], (error, results) => {
    if (error) {
      return res.json("Error");
    }
    return res.json(results);
  });
});
app.get("/exportExcel", (req, res) => {
  const sql = "SELECT * FROM skuwisedispatch";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Error fetching data" });
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Skuwisedispatch");

      // Add table headers
      worksheet.columns = [
        { header: "SlNo", key: "SlNo" },
        { header: "Product", key: "Product" },
        { header: "SkuCode", key: "SkuCode" },
        { header: "SkuDescription", key: "SkuDescription"},
        { header: "	InfeedCount", key: "InfeedCount" },
        { header: "MonthlyInfeed", key: "MonthlyInfeed" },
        { header: "Dispatch", key: "Dispatch" },
        { header: "MonthlyDispatch", key: "MonthlyDispatch" },
        { header: "Date", key: "Date" },
       

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
        "attachment; filename=SkuwiseDispatch.xlsx"
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