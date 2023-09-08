import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material";

import { FileExcelOutlined } from "@ant-design/icons";
import axios from "axios";

function TruckWiseLoadingReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 

  useEffect(() => {
    axios
      .post("http://localhost:5000/truckwiseloading/truckwiseloadingreport")
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
    .get("http://localhost:5000/truckwiseloading/exportExcel", { responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "TruckwiseLoading.xlsx");
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
   { field: "Product", headerName: "	Product",flex: 1 },
    { field: "SkuCode", headerName: "SkuCode", flex: 1 },
   { field: "ZotbNumber", headerName: "ZotbNumber",flex: 1  },
   { field: "BatchNo", headerName: "BatchNo",flex: 1  },
   { field: "MaterialQuantity", headerName: "MaterialQuantity",flex: 1  },
   { field: "Date", headerName: "Date",flex: 1  },
   

  ];

  const rows = data.map((truckwiseloadingreport) => ({
    id:truckwiseloadingreport.SlNo, // Assign the 'SlNo' as a unique identifier
    ...truckwiseloadingreport,
  }));

  return (
    <>
      <div className="show">
        <center>
          <h2 align="left">Truck wise loading Report</h2>
        
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
   <Box sx={{ height: '100%', width: '90%', marginTop: '10px' }}>

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


export default TruckWiseLoadingReport