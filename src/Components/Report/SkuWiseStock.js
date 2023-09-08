import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material";
import axios from "axios";

function SkuWiseStock() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 

  useEffect(() => {
    axios
      .post("http://localhost:5000/skustock/skustock")
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
    { field: "SlNo", headerName: "SlNo",flex: 1  },
    { field: "SkuCode", headerName: "SkuCode", flex: 1 },
    { field: "SkuName", headerName: "SkuName",flex: 1  },
   { field: "BatchName", headerName: "BatchName",flex: 1  },
   { field: "BatchQuantity", headerName: "BatchQuantity",flex: 1  },
   { field: "SkuQuantity", headerName: "SkuQuantity",flex: 1  },

  ];

  const rows = data.map((skustock) => ({
    id: skustock.SlNo, // Assign the 'SlNo' as a unique identifier
    ...skustock,
  }));
  


  return (
    <>
      <div className="show">
        <center>
          <h2 align="left">Manage Sku wise stock </h2>
        &nbsp;&nbsp;&nbsp;&nbsp;
        </center>
      </div>
     &nbsp;&nbsp;&nbsp;&nbsp;
      <div style={{ paddingTop: "60px" }} align="center">
        <center>
   <Box sx={{ height: '100%', width: '100%', marginTop: '10px' }}>
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
export default SkuWiseStock
