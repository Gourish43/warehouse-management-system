const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const ExcelJS = require("exceljs");

app.post("/liveinfeed", (req, res) => {
     const { SlNo,Mission,PalletCode,SkuCode,Sku,Product,PoNo,BatchNo,Quantity,Floor,Area,Rack,Position,Status,StartDate,StartTime,EndDate,EndTime} = req.body;

  const sql = "SELECT * FROM infeedlive";
  
  db.query(sql,[SlNo,Mission,PalletCode,SkuCode,Sku,Product,PoNo,BatchNo,Quantity,Floor,Area,Rack,Position,Status,StartDate,StartTime,EndDate,EndTime], (error, results) => {
    if (error) {
      return res.json("Error");
    }
    return res.json(results);
  });
});
app.get("/exportExcel", (req, res) => {
  const sql = "SELECT * FROM infeedlive";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Error fetching data" });
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("LiveInfeed");

      // Add table headers
      worksheet.columns = [
        { header: "SlNo", key: "SlNo" },
        { header: "Mission", key: "Mission" },
        { header: "	PalletCode", key: "	PalletCode" },
        { header: "SkuCode", key: "SkuCode" },
        { header: "	Sku", key: "Sku" },
        { header: "Product", key: "	Product" }, 
        { header: "PoNo", key: "PoNo" },
        { header: "BatchNo", key: "BatchNo" },
        { header: "Quantity", key: "Quantity" },
        { header: "	Floor", key: "Floor" },
        { header: "Area", key: "Area" },
        { header: "Rack", key: "Rack" },
        { header: "Position", key: "Position" },
        { header: "Status", key: "Status" },
        { header: "StartDate", key: "StartDate" },
        { header: "StartTime", key: "StartTime" },
        { header: "EndDate", key: "EndDate" },
        { header: "EndTime", key: "EndTime" },
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
        "attachment; filename=LiveInfeed.xlsx"
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

// Calculate and return status counts
app.get("/statusCounts", (req, res) => {
  const statusCountsQuery ="SELECT Status,COUNT(Status) AS count FROM infeedlive GROUP BY Status";

  db.query(statusCountsQuery, (err, results) => {
    if (err) {
      console.error("Error fetching status counts:", err);
      res.status(500).json({ error: "Error fetching status counts" });
    } else {
    
      const statusCounts = {};
      results.forEach((row) => {
        statusCounts[row.Status] = row.count;
      });
      res.json(statusCounts);
    }
  });
});


module.exports=app;