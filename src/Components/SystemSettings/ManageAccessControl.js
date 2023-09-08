
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material";
import axios from "axios";

function ManageAccessControl() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 useEffect(() => {
    axios
      .post("http://localhost:5000/manageaccesscontrol/accesscontrol")
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
  

  if (loading) {
    return <div>Loading...</div>;
  }
  const columns = [
    { field: 'SlNo', headerName: 'SL No', width: 100 },
    { field: 'ModuleName', headerName: 'ModuleName', width: 200 },
    { field: 'Admin', headerName: 'Admin', width: 150 },
    { field: 'Planner', headerName: 'Planner', width: 200 },
    { field: 'Dock', headerName: 'Dock', width: 180 },
    // Add more columns as needed
  ];
  

  const rows = data.map((accesscontrol) => ({
    id:accesscontrol.SlNo, // Assign the 'SlNo' as a unique identifier
    ...accesscontrol,
  }));

  return (
    <>
      <div>


          <h2 align="left">Manage Access Control</h2>
      
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
export default ManageAccessControl;
