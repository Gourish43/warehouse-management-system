const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const ExcelJS = require("exceljs");

app.post("/dockwiseoutfeed", (req, res) => {
  const { SlNo,Product,PalletCode,SkuCode,Sku,PalletSections,BatchNo,QuantityLoadingBay,PalletMaterialLoadedCount,PalletMaterialDockCount,LoadingDateAndTime	
  } = req.body;

  const sql = "SELECT * FROM dockwiseoutfeed";
  
  db.query(sql, [SlNo,Product,PalletCode,SkuCode,Sku,PalletSections,BatchNo,QuantityLoadingBay,PalletMaterialLoadedCount,PalletMaterialDockCount,LoadingDateAndTime	], (error, results) => {
    if (error) {
      return res.json("Error");
    }
    return res.json(results);
  });
});
app.get("/exportExcel", (req, res) => {
  const sql = "SELECT * FROM dockwiseoutfeed";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Error fetching data" });
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("DockwiseOutfeed");

      // Add table headers
      worksheet.columns = [
        { header: "SlNo", key: "SlNo" },
        { header: "Product", key: "Product" },
        { header: "PalletCode", key: "PalletCode" },
        { header: "SkuCode", key: "SkuCode" },
        { header: "Sku", key: "Sku" },
        { header: "PalletSections", key: "PalletSections" },
        { header: "PoNo", key: "PoNo" },
        { header: "BatchNo", key: "BatchNo" },
        { header: "QuantityLoadingBay", key: "QuantityLoadidngBay" },
        { header: "PalletMaterialLoadedCount", key: "PalletMaterialLoadedCount" },
        { header: "PalletMaterialDockCount", key:"PalletMaterialDockCount" },
        { header: "LoadDateAndTime", key: "LoadDateAndTime" },

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
        "attachment; filename=DockWiseReport.xlsx"
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