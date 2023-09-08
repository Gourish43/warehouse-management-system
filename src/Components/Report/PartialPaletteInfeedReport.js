
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material";
import { FileExcelOutlined } from "@ant-design/icons";
import axios from "axios";


function PartialPaletteInfeedReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [statusCounts, setStatusCounts] = useState({});
  const [statusCountsRows, setStatusCountsRows] = useState([]);
 useEffect(() => {
    axios
      .post("http://localhost:5000/partialpalletinfeed/partialinfeed")
      .then((response) => {
        setData(response.data);
        setLoading(false);
        
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      });
      
      axios
      .get("http://localhost:5000/partialpalletinfeed/statusCounts")
      .then((response) => {
        setStatusCounts(response.data);
        const rows = Object.keys(response.data).map((status) => ({
          Status: status,
          count: response.data[status],
        }));
        setStatusCountsRows(rows);
      })
      .catch((error) => {
        console.error("Error fetching status counts:", error);
      });
      }, []);
const handleExportExcel = () => {
  axios
    .get("http://localhost:5000/partialpalletinfeed/exportExcel", { responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
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
}


  if (loading) {
    return <div>Loading...</div>;
  }
  
  const columns = [
    { field: 'SlNo', headerName: 'Sl No', flex: 1 },
    { field: 'Mission', headerName: 'Mission', flex: 1 },
    { field: 'PalletCode', headerName: 'PalletCode', flex: 1 },
    { field: 'SkuCode', headerName: 'SkuCode', flex: 1 },
    { field: 'Sku', headerName: 'SKU', flex: 1 },
    { field: 'Product', headerName: 'Product', flex: 1 },
    { field: 'PoNo', headerName: 'PO no', flex: 1 },
    { field: 'BatchNo', headerName:'Batch No', flex: 1 },
    { field: 'Quantity', headerName:'Quantity', flex: 1 },
    { field: 'Floor', headerName:'Floor', flex: 1 },
    { field: 'Area', headerName:'Area', flex: 1 },
    { field: 'Rack', headerName:'Rack', flex: 1 },
    { field: 'Position', headerName:'Position', flex: 1 },
    { field: 'Status', headerName:'Status', flex: 1 },
    { field: 'StartDate', headerName:'Start Date', flex: 1 },
    { field: 'StartTime', headerName:'Start Time', flex: 1 },
    { field: 'EndDate', headerName:'End Date', flex: 1 },
    { field: 'EndTime', headerName:'End Time', flex: 1 },
  ];
  
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
  const rows = data.map((partialinfeed) => ({
    id:partialinfeed.SlNo, // Assign the 'SlNo' as a unique identifier
    ...partialinfeed,
  }));
  return (
    <>
      <div className="show">
        <center>
          <h2 align="left">Partial Pallet Infeed Report</h2>
        
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button align="right" type="primary"  onClick={handleExportExcel} >
            <FileExcelOutlined />
            exportExcel
          </button>
        </center>
      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <center>
      <Box sx={{ height: '40%', width: '50%', marginTop: '10px' }}>
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
          </center>
        <div>
        <center>
   <Box sx={{ height:'50%',width:'90%', marginTop: '10px' }}>

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
  );
}
export default PartialPaletteInfeedReport
