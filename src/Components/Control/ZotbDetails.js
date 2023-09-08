import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material";
import axios from "axios";

function ZotbDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .post("http://localhost:5000/zotbdetails/zotb")
      .then((response) => {
        setData(response.data);
        setLoading(false);
        
        
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      });
  }, [])
  

  if (loading) {
    return <div>Loading...</div>;
  }
  const columns = [
    { field: "SlNo", headerName: "SlNo",flex: 1  },
    { field: "ZotbNumber", headerName: "ZotbNumber", flex: 1 },
    { field: "TruckNumber", headerName: "TruckNumber", flex: 1 },
    { field: "ZotbDispatchStartDate", headerName: "ZotbDispatchStartDate",flex: 1 },
    { field: "ZotbDispatchStartTime", headerName: "ZotbDispatchStartTime",flex: 1 },
    { field: "Status", headerName: "Status",flex: 1 },
    { field: "Action", headerName: "Action",flex: 1 },
  ];
  const rows = data.map((zotbdetails) => ({
    id: zotbdetails.SlNo, // Assign the 'SlNo' as a unique identifier
    ...zotbdetails,
  }));
return (
    <>
    <h2>ZotbDetails</h2>
    &nbsp;&nbsp;&nbsp;&nbsp;
      <div style={{ paddingTop: "60px" }} align="center">
    <center>
   <Box sx={{ height: '100%', width: '50%', marginTop: '10px' }}>
    <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            width={[100]}
          />
          </Box>
           </center>
           </div>
    </>
  );
}

export default ZotbDetails
