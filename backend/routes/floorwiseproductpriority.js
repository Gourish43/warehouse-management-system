const express = require("express");
const db = require("../DbConnection");
const app=express.Router();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const ExcelJS = require("exceljs");

app.post("/floorwiseProd", (req, res) => {
  const { SlNo, FloorName, ProductName, Priority } = req.body;

  const sql = "SELECT * FROM floorwiseproduct";
  
  db.query(sql, [SlNo, FloorName, ProductName, Priority], (error, results) => {
    if (error) {
      return res.json("Error");
    }
    return res.json(results);
  });
});
app.post("/insertProduct", (req, res) => {
  const { SlNo, FloorName, ProductName, Priority } = req.body;

  const sql =
    "INSERT INTO floorwiseproduct (SlNo, FloorName, ProductName, Priority) VALUES (?, ?, ?, ?)";
  db.query(sql, [SlNo, FloorName, ProductName, Priority], (error, result) => {
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

  const sql = "DELETE FROM floorwiseproduct WHERE SlNo = ?";

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
  const { FloorName, ProductName, Priority } = req.body;

  const sql =
    "UPDATE floorwiseproduct SET FloorName = ?, ProductName = ?, Priority = ? WHERE SlNo = ?";
  db.query(
    sql,
    [FloorName, ProductName, Priority, SlNo],
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
app.get("/exportExcel", (req, res) => {
  const sql = "SELECT * FROM floorwiseproduct";

  db.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Error fetching data" });
    }

    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("FloorwiseProduct");

      // Add table headers
      worksheet.columns = [
        { header: "SlNo", key: "SlNo" },
        { header: "FloorName", key: "FloorName" },
        { header: "ProductName", key: "ProductName" },
        { header: "Priority", key: "Priority" },
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
        "attachment; filename=FloorwiseProduct.xlsx"
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