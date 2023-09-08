import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

function ManageStockAndDispatch() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("Pouch");
  useEffect(() => {
    axios
      .post("http://localhost:5000/stockdispatch/stockdispatch")
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
    { field: 'SlNo', headerName: 'SlNo', flex: 1 },
    { field: 'PositionRow', headerName: 'PositionRow', flex: 1 },
    { field: 'PalletCode', headerName: 'PalletCode', flex: 1 },
    { field: 'SkuCode', headerName: 'SkuCode', flex: 1 },
    { field: 'Sku', headerName: 'Sku', flex: 1 },
    { field: 'Product', headerName: 'Product', flex: 1 },
    { field: 'PoNo', headerName: 'PoNo', flex: 1 },
    { field: 'BatchNo', headerName: 'BatchNo', flex: 1 },
    { field: 'Quantity', headerName: 'Quantity', flex: 1 },
    { field: 'Floor', headerName: 'Floor', flex: 1 },
    { field: 'Area', headerName: 'Area', flex: 1 },
    { field: 'RackColumn', headerName: 'RackColumn', flex: 1 },
    { field: 'Rack', headerName: 'Rack', flex: 1 },
    { field: 'Position', headerName: 'Position', flex: 1 },
    { field: 'LoadDate', headerName: 'LoadDate', flex: 1 },
    { field: 'LoadTime', headerName: 'LoadTime', flex: 1 },
  
  ];
  const filteredRows = selectedProduct
  ? data.filter((stockdispatch) => stockdispatch.Product === selectedProduct)
  : data;

const rows = filteredRows.map((stockdispatch) => ({
  id: stockdispatch.SlNo,
  ...stockdispatch,
}));


const handleCardClick = (Product) => {
  console.log("Clicked on:", Product);
  setSelectedProduct(Product);
};
const handleTotalStockClick = () => {
  setSelectedProduct(null); // Show all data
};
const productCounts = {
  Pouch: data.filter((item) => item.Product === "Pouch").length,
  Tin: data.filter((item) => item.Product === "Tin").length,
  Jar: data.filter((item) => item.Product === "Jar").length,
  "Pet(Bottle)": data.filter((item) => item.Product === "Pet(Bottle)").length,
};
const totalCount = data.length;
return (
    <>
    <h2>Manage Stock and Dispatch</h2>
    &nbsp;&nbsp;&nbsp;&nbsp;
    <div style={{ display: "flex", justifyContent: "space-between", margin: "20px" }}>
        {/* Card for Pouch */}
        <Card onClick={() => handleCardClick("Pouch")}>
          <CardContent>
            <Typography variant="h6">Pouch</Typography>
            <Typography variant="body2">{productCounts.Pouch}</Typography>
            {/* Add content for Pouch card here */}
          </CardContent>
        </Card>

        {/* Card for Tin */}
        <Card onClick={() => handleCardClick("Tin")}>
          <CardContent>
            <Typography variant="h6">Tin</Typography>
            <Typography variant="body2">{productCounts.Tin}</Typography>
            {/* Add content for Tin card here */}
          </CardContent>
        </Card>

        {/* Card for Jar */}
        <Card onClick={() => handleCardClick("Jar")}>
          <CardContent>
            <Typography variant="h6">Jar</Typography>
            <Typography variant="body2">{productCounts.Jar}</Typography>
            {/* Add content for Jar card here */}
          </CardContent>
        </Card>

        {/* Card for Pet (Bottle) */}
        <Card  onClick={() => handleCardClick("Pet(Bottle)")}>
          <CardContent>
            <Typography variant="h6">Pet (Bottle)</Typography>
            <Typography variant="body2"> {productCounts["Pet(Bottle)"]}</Typography>
            {/* Add content for Pet (Bottle) card here */}
          </CardContent>
        </Card>
        <Card onClick={() => handleTotalStockClick()}>
          <CardContent>
            <Typography variant="h6">Total Stock</Typography>
            <Typography variant="body2"> {totalCount}</Typography>
          </CardContent>
        </Card>
      </div>
      
      {/* Search Bar and Button */}
      <div style={{ display: "flex", alignItems: "center", margin: "20px" }}>
        <input
          type="text"
          placeholder="Search..."
          style={{ padding: "5px", marginRight: "10px" }}
          // Add your search logic here
        />
        <button>Select Stock for dispatch</button>
      </div>
      <div style={{ paddingTop: "60px" }} align="center">
    <center>
   <Box sx={{ height: '100%', width: '100%', marginTop: '10px' }}>
   {rows.length === 0 ? (
            <div>No data available for {selectedProduct}</div>
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          )}
          </Box>
           </center>
           </div>
    </>
  );
}



export default ManageStockAndDispatch
