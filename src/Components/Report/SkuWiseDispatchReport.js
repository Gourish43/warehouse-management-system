import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material";

import { FileExcelOutlined } from "@ant-design/icons";
import axios from "axios";

function SkuWiseDispatchReport() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 

  useEffect(() => {
    axios
      .post("http://localhost:5000/skuwisedispatch/skuwisedispatch")
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
    .get("http://localhost:5000/skuwisepatch/exportExcel", { responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Skuwisedispatch.xlsx");
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
   { field: "SkuDecription", headerName: "SkuDescription",flex: 1  },
   { field: "InfeedCount", headerName: "InfeedCount",flex: 1  },
   { field: "MonthlyInfeed", headerName: "MonthlyInfeed",flex: 1  },
   { field: "Dispatch", headerName: "Dispatch(Outfeed)",flex: 1  },
   { field: "MonthlyDispatch", headerName: "MonthlyDispatch",flex: 1  },
   { field: "Date", headerName: "Date",flex: 1  },
   

  ];

  const rows = data.map((skuwisedispatch) => ({
    id:skuwisedispatch.SlNo, // Assign the 'SlNo' as a unique identifier
    ...skuwisedispatch,
  }));

  return (
    <>
      <div className="show">
        <center>
          <h2 align="left">Manage Sku Wise Dispatch </h2>
        
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

export default SkuWiseDispatchReport
