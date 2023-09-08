
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material";
import { FileExcelOutlined } from "@ant-design/icons";

function RunTimeMachineOutfeed() {
  const [data, setData] = useState([]);
  const [statusCounts, setStatusCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [statusCountsRows, setStatusCountsRows] = useState([]);


  useEffect(() => {
    fetch("http://localhost:5000/machineoutfeed/missionoutfeed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const rows = data.map((missionoutfeed) => ({
    id: missionoutfeed.SlNo,
    ...missionoutfeed,
  }));

  fetch("http://localhost:5000/machineoutfeed/outfeed")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    setStatusCounts(data);
    const rows = Object.keys(data).map((status) => ({
      Status: status,
      count: data[status],
    }));
    setStatusCountsRows(rows);
  })
  .catch((error) => {
    console.error("Error fetching status counts:", error);
    console.log("Response:", error.response); 
  });

  const calculateStatusCounts = () => {
    const counts = {};

    data.forEach((row) => {
      const Status = row.Status; // Replace 'status' with your actual column name
      if (counts[Status]) {
        counts[Status] += 1;
      } else {
        counts[Status] = 1;
      }
    });
    setStatusCounts(counts);
  };

  const handleExportExcel = () => {
    fetch("http://localhost:5000/QueryMissionOutfeed/exportExcel")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "MissionInfeed.xlsx");
        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        console.log("Error exporting Excel:", error);
      });
  };  
  const columns = [
    { field: "SlNo", headerName: "Sl No", flex: 1 },
    { field: "Mission", headerName: "Mission", flex: 1 },
    { field: "PalletCode", headerName: "PalletCode", flex: 1 },
    { field: "SkuCode", headerName: "SkuCode", flex: 1 },
    { field: "Sku", headerName: "SKU", flex: 1 },
    { field: "Product", headerName: "Product", flex: 1 },
    { field: "PoNo", headerName: "PO no", flex: 1 },
    { field: "BatchNo", headerName: "Batch No", flex: 1 },
    { field: "Quantity", headerName: "Quantity", flex: 1 },
    { field: "Floor", headerName: "Floor", flex: 1 },
    { field: "Area", headerName: "Area", flex: 1 },
    { field: "Rack", headerName: "Rack", flex: 1 },
    { field: "Position", headerName: "Position", flex: 1 },
    { field: "Status", headerName: "Status", flex: 1 },
    { field: "StartDate", headerName: "Start Date", flex: 1 },
    { field: "StartTime", headerName: "Start Time", flex: 1 },
    { field: "EndDate", headerName: "End Date", flex: 1 },
    { field: "EndTime", headerName: "End Time", flex: 1 },
  ];
  
  return (
    <>
      <div className="show">
        <center>
          <h2 align="left">Runtime Mission Outfeed</h2>
          <button align="right" type="primary" onClick={handleExportExcel} >
            <FileExcelOutlined />
            exportExcel
          </button>
        </center>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Box sx={{ height: "40%", flex: "25%", marginTop: "10px" }}>
          <DataGrid
              rows={[
                {
                  id: 'statusCountsRow',
                  Status: 'Completed',
                  count: statusCounts.Completed || 0,
                },
                {
                  id: 'statusCountsRow2',
                  Status: 'Ready',
                  count: statusCounts.Ready || 0,
                },
                {
                  id: 'statusCountsRow3',
                  Status: 'In Progress',
                  count: statusCounts.Inprogress || 0,
                },
                {
                  id: 'statusCountsRow4',
                  Status: 'Await',
                  count: statusCounts.Await || 0,
                },
              ]}
              columns={[
                { field: 'Status', headerName: 'Status', flex: 1 },
                { field: 'count', headerName: 'Count', flex: 1 },
              ]}
              pageSize={3}
              rowsPerPageOptions={[3]}
              flex={[100]}
            />

          </Box>
          <div>
            <center>
              <Box sx={{ height: "50%", flex: "50%", marginTop: "10px" }}>
              <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            flex={[100]}
            onRowsChange={calculateStatusCounts}

          />

              </Box>
            </center>
          </div>
        </>
      )}
    </>
  );
}

export default RunTimeMachineOutfeed
