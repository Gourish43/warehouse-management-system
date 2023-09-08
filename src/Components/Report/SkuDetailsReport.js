import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material";

import { FileExcelOutlined } from "@ant-design/icons";
import axios from "axios";

function SkuDetailsReport() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 

  useEffect(() => {
    axios
      .post("http://localhost:5000/skudetails/skudetails")
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
    .get("http://localhost:5000/skudetails/exportExcel", { responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "SkuStorageDetails.xlsx");
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
    { field: "SlNo", headerName: "SlNo",flex: 1  },
    { field: "PalletCode", headerName: "PalletCode", flex: 1 },
    { field: "SkuCode", headerName: "SkuCode", flex: 1 },
    { field: "Product", headerName: "	Product",flex: 1 },
   { field: "Position", headerName: "	Position",flex: 1  },
   { field: "BatchNo", headerName: "	BatchNo",flex: 1  },
   { field: "Quantity", headerName: "Quantity",flex: 1  },
   { field: "PoNo", headerName: "PoNo",flex: 1  },
   { field: "Sku", headerName: "Sku",flex: 1  },
   { field: "Floor", headerName: "Floor",flex: 1  },
   { field: "Area", headerName: "Area",flex: 1  },
   { field: "Rack", headerName: "Rack",flex: 1  },
   { field: "Day", headerName: "Day",flex: 1  },
   { field: "LoadDate", headerName: "LoadDate",flex: 1  },
   { field: "LoadTime", headerName: "LoadTime",flex: 1  },

  ];

  const rows = data.map((skustorage) => ({
    id: skustorage.SlNo, // Assign the 'SlNo' as a unique identifier
    ...skustorage,
  }));

  return (
    <>
      <div className="show">
        <center>
          <h2 align="left">Manage Sku Storage Details Report </h2>
        
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

export default SkuDetailsReport
