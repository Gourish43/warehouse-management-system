import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material";import { FileExcelOutlined } from "@ant-design/icons";
import axios from "axios";
function LockActivity() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 

  useEffect(() => {
    axios
      .post("http://localhost:5000/lockactivity/lockactivity")
      .then((response) => {
        setData(response.data);
        setLoading(false);
        
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      });
  }, []);
  
const handleExportExcel = () => {
  axios
    .get("http://localhost:5000/lockactivity/exportExcel", { responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "LockActivity.xlsx");
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
    { field: 'SlNo', headerName: 'SL No', flex: 1 },
    { field: 'FloorName', headerName: 'Floor Name', flex: 1 },
    { field: 'FloorDescription', headerName: 'Floor Description', flex: 1 },
    { field: 'AreaName', headerName: 'Area Name', flex: 1 },
    { field: 'AreaDescription', headerName: 'Area Description', flex: 1 },
    { field: 'LockComments', headerName: 'Lock Comments', flex: 1 },
    { field: 'LockActivity', headerName: 'Lock Activity', flex: 1 },
    { field: 'LockStartDate', headerName: 'Lock Start Date', flex: 1 },
    { field: 'LockStartTime', headerName: 'Lock Start Time', flex: 1 },
    { field: 'LockEndDate', headerName: 'Lock End Date', flex: 1 },
    { field: 'LockEndTime', headerName: 'Lock End Time', flex: 1 },
    { field: 'LockUserName', headerName: 'Lock User Name', flex: 1 },
    { field: 'UnlockUserName', headerName: 'Unlock User Name', flex: 1 },
  ];
  

  const rows = data.map((lockactivity) => ({
    id:lockactivity.SlNo, // Assign the 'SlNo' as a unique identifier
    ...lockactivity,
  }));

  return (
    <>
      <div className="show">
        <center>
          <h2 align="left">Lock Activity</h2>
        
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button align="right" type="primary"  onClick={handleExportExcel} >
            <FileExcelOutlined />
            exportExcel
          </button>
        </center>
      </div>
     
      &nbsp;&nbsp;&nbsp;&nbsp;
      <div style={{ paddingTop: "60px" }} align="center">
        
        <center>
   <Box sx={{ height: '100%', width: '90%', marginTop: '10px' }}>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            flex={[100]}
          />
          </Box>
           </center>
      
       </div>
    </>
  );
}

export default LockActivity
