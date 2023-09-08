import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box, colors} from "@mui/material";
import axios from "axios";

function ManageSku() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeRows, setActiveRows] = useState([]);
  
  useEffect(() => {
    axios
      .post("http://localhost:5000/sku/managesku")
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
    { field: "SkuName", headerName: "	Sku Name", flex: 1 },
    { field: "SkuDescription", headerName: "Sku Description",flex: 1 },
    { field: "SkuCode", headerName: "SkuCode",flex: 1  },
    { field: "AverageQuantity", headerName: "Average Quantity",flex: 1  },
    { field: "ProductName", headerName: "Product Name",flex: 1  },
    { field: "SkuDate", headerName: "	Sku Date",flex: 1  },
    { field: "SkuTime", headerName: "Sku Time",flex: 1  },
    {field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        const rowId = params.id;
        const isActive = activeRows.includes(rowId);
        return (
          <div>
            <button
              onClick={() => handleButtonClick(rowId)}
              className={isActive ? "active" : ""} >
              {isActive ? "InActive" : "Active"}
            </button>
          </div>
        );
      },
    },
  ];


  const rows = data.map((managesku) => {
    const rowId = managesku.SlNo;
    const isActive = activeRows.includes(rowId);
  
    return {
      id: rowId,
      ...managesku,
      SkuDate: new Date(managesku.SkuDate).toLocaleDateString(),
      SkuTime: new Date(managesku.SkuTime).toLocaleTimeString(),
      isBlurred: !isActive, // Add an 'isBlurred' property based on isActive
    };
  });


  const handleButtonClick = (rowId) => {
    setActiveRows((prevActiveRows) =>
      prevActiveRows.includes(rowId)
        ? prevActiveRows.filter((id) => id !== rowId)
        : [...prevActiveRows, rowId]
    );
  };

  return (
    <>
    <h2>Manage SKU</h2>
     
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
            getRowClassName={(params) =>
              params.row.isBlurred ? "blurred" : ""
            } 
          />
          </Box>
           </center>
           </div>
    </>
  );
}


export default ManageSku
