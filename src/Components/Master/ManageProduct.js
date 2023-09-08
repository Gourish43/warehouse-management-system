
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import { IconButton,Button ,Box} from "@mui/material";
import { PlusOutlined ,DeleteOutlined,EditOutlined} from "@ant-design/icons";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import DialogContentText from "@mui/material/DialogContentText"
function ManageProduct() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 

  useEffect(() => {
    axios
      .post("http://localhost:5000/product/manageproduct")
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
  

 

  const [openDialog, setOpenDialog] = useState(false);
  const [editedRowSlNo, setEditedRowSlNo] = useState("");
  const [editedData, setEditedData] = useState({
    SlNo: "",
    ProductName: "",
  ProductDescription: "",
  });

  const handleEditClick = (SlNo) => {
    // Find the row with the corresponding SlNo
    const rowToEdit = data.find((row) => row.SlNo === SlNo);
    setEditedData(rowToEdit);
    setEditedRowSlNo(SlNo);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSaveClick = () => {
    // Perform save action here
    axios
      .put(`http://localhost:5000/product/updateProduct/${editedRowSlNo}`, editedData)
      .then((response) => {
        console.log("Product updated successfully!", response.data);
        fetchData(); // Refresh the data after updating
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
    console.log("Data to be saved:", editedData);
    handleCloseDialog();
  };
   const [openAddDialog, setOpenAddDialog] = useState(false);
    const [newData, setNewData] = useState({
      SlNo: "",
      ProductName: "",
    ProductDescription: "",
  });


  const handleAddClick = () => {
    setOpenAddDialog(true);
  };  

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setNewData({
      SlNo: "",
    ProductName: "",
  ProductDescription: "",
    });
  };

  const handleAddSaveClick = () => {
    // You can perform API call here to save the new data to the backend
    // For simplicity, let's just update the state for now.
    axios
      .post("http://localhost:5000/product/insertProduct", newData)
      .then((response) => {
        console.log("Product added successfully!", response.data);
        fetchData(); // Refresh the data after adding
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
    handleAddDialogClose();
  };

 const fetchData = () => {
  axios
    .get("http://localhost:5000/product/manageproduct")
    .then((response) => {
      setData(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
      setError(true);
      setLoading(false);
    });
};
const [deleteRowId, setDeleteRowId] = useState(null);

  const handleDeleteClick = (SlNo) => {
    setDeleteRowId(SlNo);
  };

  const handleDeleteConfirmation = () => {
    axios
      .delete(`http://localhost:5000/product/deleteProduct/${deleteRowId}`)
      .then((response) => {
        console.log("Product deleted successfully!", response.data);
        // Refresh the data after deleting
        fetchData(); 
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
      });
    setDeleteRowId(null); // Clear the deleteRowId 
  };
  
  


  const handleCancelDelete = () => {
    setDeleteRowId(null); // Clear the deleteRowId if the user cancels
  };
 
if (loading) {
    return <div>Loading...</div>;
  }
  const columns = [
    { field: "SlNo", headerName: "SlNo",flex: 1  },
    { field: "ProductName", headerName: "Product Name", flex: 1 },
    { field: "ProductDescription", headerName: "Product Description",flex: 1 },
   
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div>
            <IconButton onClick={() => handleEditClick(params.id)}>
            <EditOutlined />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.id)}>
            <DeleteOutlined />
          </IconButton>
         
        </div>
      ),
    },
  ];

  const rows = data.map((manageproduct) => ({
    id: manageproduct.SlNo, // Assign the 'SlNo' as a unique identifier
    ...manageproduct,
  }));

  return (
  
      <>
      <div className="show">
        <center>
          <h2 align="left">Manage Product </h2>
          <button align="right" type="primary" onClick={handleAddClick}>
            <PlusOutlined />
            Add Product
          </button>
        </center>
      </div>
     
      &nbsp;&nbsp;&nbsp;&nbsp;
      <div style={{ paddingTop: "60px" }} align="center">
        
        <center>
   <Box sx={{ height: '100%', width: '50%', marginTop: '10px' }}>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            width={[100]}
          />
          </Box>
           </center>
      
        {/* Dialog box for editing */}
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle >Edit Row</DialogTitle>
          <DialogContent style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1px',
                        padding: '20px',
                        backgroundColor: 'white',
                        color: 'black',
                    }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="SlNo"
                  value={editedData.SlNo}
                  onChange={(e) =>
                    setEditedData({ ...editedData, SlNo: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="ProductName"
                  value={editedData.ProductName}
                  onChange={(e) =>
                    setEditedData({ ...editedData, ProductName: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="ProductDescription"
                  value={editedData.ProductDescription}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                     ProductDescription: e.target.value,
                    })
                  }
                  fullWidth
                />
              </Grid>
             
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSaveClick} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        {/* Confirmation Dialog box for delete */}
      </div>
      {/* Dialog box for adding new data */}
      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
        <DialogTitle>Add New Row</DialogTitle>
        <DialogContent>
          <TextField
            label="SlNo"
            value={newData.SlNo}
            onChange={(e) => setNewData({ ...newData, SlNo: e.target.value })}
            fullWidth
          />
          <TextField
            label="ProductName"
            value={newData.ProductName}
            onChange={(e) => setNewData({ ...newData, ProductName: e.target.value })}
            fullWidth
          />
          <TextField
            label="ProductDescription"
            value={newData.ProductDescription}
            onChange={(e) => setNewData({ ...newData, ProductDescription: e.target.value })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button onClick={handleAddSaveClick} >
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteRowId !== null} onClose={handleCancelDelete}>
        <DialogTitle>Delete Row</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the row with SlNo: {deleteRowId}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button> 
          <Button onClick={handleDeleteConfirmation} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ManageProduct
