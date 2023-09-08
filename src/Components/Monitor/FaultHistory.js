import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material";

import { FileExcelOutlined } from "@ant-design/icons";
import axios from "axios";

function FaultHistory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 

  useEffect(() => {
    axios
      .post("http://localhost:5000/faulthistory/faulthistory")
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
    .get("http://localhost:5000/faulthistory/exportExcel", { responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "FaultHistory.xlsx");
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
    { field: 'SlNo', headerName: 'SL No', width: 100 },
    { field: 'EquipmentName', headerName: 'Equipment Name', width: 200 },
    { field: 'EquipmentDescription', headerName: 'Equipment Description', width: 200 },
    { field: 'AlarmName', headerName: 'Alarm Name', width: 150 },
    { field: 'AlarmDescription', headerName: 'Alarm Description', width: 200 },
    { field: 'AlarmOccurDate', headerName: 'Alarm Occur Date', width: 180 },
    { field: 'AlarmOccurTime', headerName: 'Alarm Occur Time', width: 150 },
    { field: 'AlarmResolvedDate', headerName: 'Alarm Resolved Date', width: 180 },
    { field: 'AlarmResolvedTime', headerName: 'Alarm Resolved Time', width: 150 },
    // Add more columns as needed
  ];
  

  const rows = data.map((faulthistory) => ({
    id:faulthistory.SlNo, // Assign the 'SlNo' as a unique identifier
    ...faulthistory,
  }));

  return (
    <>
      <div className="show">
        <center>
          <h2 align="left">Fault History</h2>
        
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
          <Box sx={{ height: '100%', width:'100%', marginTop: '10px' ,align:'center'}}>
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


export default FaultHistory
