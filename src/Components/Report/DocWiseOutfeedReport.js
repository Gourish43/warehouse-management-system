
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {Box} from "@mui/material";

import { FileExcelOutlined } from "@ant-design/icons";
import axios from "axios";
function DocWiseOutfeedReport() {
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 

  useEffect(() => {
    axios
      .post("http://localhost:5000/dockwise/dockwiseoutfeed")
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
    .get("http://localhost:5000/dockwise/exportExcel", { responseType: "blob" })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "DockwiseOutfeed.xlsx");
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
    { field: 'SlNo', headerName: 'SL No', flex: 1 },
    { field: 'Product', headerName: 'Product', flex: 1},
    { field: 'PalletCode', headerName: 'PalletCode', flex: 1},
    { field: 'SkuCode', headerName: 'SkuCode', flex: 1 },
    { field: 'PalletSections', headerName: 'Pallet Sections', flex: 1},
    { field: 'PoNo', headerName: 'PO No', flex: 1 },
    { field: 'BatchNo', headerName: 'Batch No', flex: 1 },
    { field: 'QuantityLoadingBay', headerName: 'Quantity Loading Bay', flex: 1},
    { field: 'PalletMaterialLoadedCount', headerName: 'Pallet Material Loaded Count', flex: 1 },
    { field: 'PalletMaterialDockCount', headerName: 'Pallet Material Dock Count', flex: 1 },
    { field: 'LoadingDateTime', headerName: 'Loading Date and Time', flex: 1 },
    ];

  const rows = data.map((dockwiseoutfeed) => ({
    id:dockwiseoutfeed.SlNo, // Assign the 'SlNo' as a unique identifier
    ...dockwiseoutfeed,
  }));

  return (
    <>
      <div className="show">
        <center>
          <h2 align="left">Dock Wise Outfeed Report</h2>
        
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
   <Box sx={{ height: '50%',width:'90%', marginTop: '10px' }}>
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            flex={[50]}
          />
          </Box>
           </center>
      
       </div>
    </>
  );
}


export default DocWiseOutfeedReport