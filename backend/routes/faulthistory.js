const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const ExcelJS = require("exceljs");

app.post("/faulthistory", (req, res) => {
     const { SlNo,EquipmentName,EquipmentDescription,AlarmName,AlarmDescription,AlarmOccurDate,AlarmOccurTime,AlarmResolvedDate,AlarmResolvedTime} = req.body;

  const sql = "SELECT * FROM faulthistory";
  
  db.query(sql, [SlNo,EquipmentName,EquipmentDescription,AlarmName,AlarmDescription,AlarmOccurDate,AlarmOccurTime,AlarmResolvedDate,AlarmResolvedTime ], (error, results) => {
    if (error) {
      return res.json("Error");
    }
    return res.json(results);
  });
});
app.get("/exportExcel", (req, res) => {
  const sql = "SELECT * FROM faulthistory";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Error fetching data" });
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("FaultHistory");

      // Add table headers
      worksheet.columns = [
        { header: "SlNo", key: "SlNo" },
        { header: "	EquipmentName", key: "EquipmentName" },
        { header: "	EquipmentDescription", key: "EquipmentDescription" },
        { header: "	AlarmName", key: "	AlarmName" },
        { header: "AlarmDescription", key: "AlarmDescription" },
        { header: "AlarmOccurDate", key: "AlarmOccurDate" },
        { header: "	AlarmOccurTime", key: "	AlarmOccurTime" },
        { header: "	AlarmResolvedDate", key: "	AlarmResolvedDate" },
        { header: "	AlarmResolvedTime", key: "	AlarmResolvedTime" },

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
        "attachment; filename=FaultHistory.xlsx"
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