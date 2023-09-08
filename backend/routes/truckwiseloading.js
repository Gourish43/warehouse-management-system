const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const ExcelJS = require("exceljs");

app.post("/truckwiseloadingreport", (req, res) => {
  const { SlNo,Product,SkuCode,ZotbNumber,BatchNo,MaterialQuantity,Date} = req.body;

  const sql = "SELECT * FROM truckwiseloadingreport";
  
  db.query(sql, [SlNo,Product,SkuCode,ZotbNumber,BatchNo,MaterialQuantity,Date], (error, results) => {
    if (error) {
      return res.json("Error");
    }
    return res.json(results);
  });
});
app.get("/exportExcel", (req, res) => {
  const sql = "SELECT * FROM truckwiseloadingreport";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Error fetching data" });
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("TruckWiseLoadingReport");

      // Add table headers
      worksheet.columns = [
        { header: "SlNo", key: "SlNo" },
        { header: "Product", key: "Product" },
        { header: "SkuCode", key: "SkuCode" },
        { header: "ZotbNumber", key: "ZotbNumber"},
        { header: "	BatchNo", key: "BatchNo" },
        { header: "MaterialQuantity", key: "MaterialQuantity" },
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
        "attachment; filename=TruckwiseLoadingReport.xlsx"
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