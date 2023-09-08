import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material";
import axios from "axios";

function LocationReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .post("http://localhost:5000/locationreport/locationreport")
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
    { field: "Position", headerName: "Position", flex: 1 },
    { field:"Rack", headerName: "Rack",flex: 1 },
    { field: "Floor", headerName: "Floor",flex: 1 },
    { field: "PositionType", headerName: "PositionType",flex: 1 },
  ];

  const rows = data.map((locationreport) => ({
    id: locationreport.SlNo, // Assign the 'SlNo' as a unique identifier
    ...locationreport,
  }));


  return (
    <>
    <h2>Location Report</h2>
     
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


export default LocationReport
