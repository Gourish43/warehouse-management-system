const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const ExcelJS = require("exceljs");

app.post("/stockageing", (req, res) => {
  const { SlNo,PalletCode,SkuCode,Sku,Product,PoNo,BatchNo,Quantity,Floor,Area,RackColumn,Rack,Position,LoadDate,LoadTime} = req.body;

  const sql = "SELECT * FROM stockageingreport";
  
  db.query(sql, [SlNo,PalletCode,SkuCode,Sku,Product,PoNo,BatchNo,Quantity,Floor,Area,RackColumn,Rack,Position,LoadDate,LoadTime], (error, results) => {
    if (error) {
      return res.json("Error");
    }
    return res.json(results);
  });
});

app.get("/exportExcel", (req, res) => {
  const sql = "SELECT * FROM stockageingreport";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Error fetching data" });
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("StockAgeingReport");

      // Add table headers
      worksheet.columns = [
        { header: "SlNo", key: "SlNo" },
        { header: "PalletCode", key: "PalletCode" },
        { header: "SkuCode", key: "SkuCode" },
        { header: "Sku", key: "Sku" },
        { header: "Product", key: "Product" },
        { header: "PoNo", key: "PoNo" },
       { header: "BatchNo", key: "BatchNo" },
        { header: "Quantity", key: "Quantity" },
       { header: "	Floor", key: "	Floor" },
        { header: "	Area", key: "	Area" },
        { header: "Rack", key: "Rack" },
        { header: "RackColumn", key: "Rackcolumn" },
        { header: "Position", key: "Position" },
        { header: "LoadDate", key: "LoadDate" },
        { header: "LoadTime", key: "LoadTime" },

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
        "attachment; filename=StockAgeingReport.xlsx"
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