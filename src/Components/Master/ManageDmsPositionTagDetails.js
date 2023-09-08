import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material";
import axios from "axios";


function ManageDmsPositionTagDetails() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .post("http://localhost:5000/dmsposition/dmsposition")
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
    { field: "PositionTagName", headerName: "PositionTag Name", flex: 1 },
    { field: "PositionTagDescription", headerName: "PositionTag Description",flex: 1 },
    { field: "PositionId", headerName: "PositionId",flex: 1 },
    { field: "PreviousPositionId", headerName: "Previous PositionId",flex: 1 },
    { field: "LiveId", headerName: "Live Id",flex: 1 },
  ];

  const rows = data.map((dmsposition) => ({
    id: dmsposition.SlNo, // Assign the 'SlNo' as a unique identifier
    ...dmsposition,
  }));


  return (
    <>
    <h2>Manage DMS Position</h2>
     
      &nbsp;&nbsp;&nbsp;&nbsp;
      <div style={{ paddingTop: "60px" }} align="center">
        
        <center>
   <Box sx={{ height: '100%', width: '70%', marginTop: '10px' }}>

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



export default ManageDmsPositionTagDetails
