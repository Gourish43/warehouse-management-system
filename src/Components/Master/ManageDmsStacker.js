import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material";
import axios from "axios";

function ManageDmsStacker() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .post("http://localhost:5000/dms/stackerdms")
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
    { field: "StackerName", headerName: "Stacker Name", flex: 1 },
    { field: "StackerDescription", headerName: "Stacker Description",flex: 1 },
  ];

  const rows = data.map((stackerdms) => ({
    id: stackerdms.SlNo, // Assign the 'SlNo' as a unique identifier
    ...stackerdms,
  }));


  return (
    <>
    <h2>Manage DMS stackers</h2>
     
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

export default ManageDmsStacker
