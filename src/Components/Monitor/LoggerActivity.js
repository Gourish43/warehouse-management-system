import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material";

import { FileExcelOutlined } from "@ant-design/icons";
import axios from "axios";

function LoggerActivity() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 

  useEffect(() => {
    axios
      .post("http://localhost:5000/loggeractivity/loggeractivity")
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
    .get("http://localhost:5000/QueryLoggerActivity/exportExcel", { responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "LoggerActivity.xlsx");
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
    { field: 'ModuleName', headerName: 'Module Name', flex: 1 },
    { field: 'LogMessage', headerName: 'Log Message', flex: 1 },
    { field: 'LogUserName', headerName: 'Log User Name', flex: 1 },
    { field: 'LogDate', headerName: 'Log Date', flex: 1 },
    { field: 'LogTime', headerName: 'Log Time', flex: 1 },
  ];
  

  const rows = data.map((loggeractivity) => ({
    id:loggeractivity.SlNo, // Assign the 'SlNo' as a unique identifier
    ...loggeractivity,
  }));

  return (
    <>
      <div className="show">
        <center>
          <h2 align="left">Logger Activity</h2>
        
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
   <Box sx={{ height: '100%', width: '70%', marginTop: '10px' }}>

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


export default LoggerActivity
