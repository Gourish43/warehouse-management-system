import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { PlusOutlined, EditOutlined, EyeOutlined,DeleteOutlined } from '@ant-design/icons';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText"
import Grid from "@mui/material/Grid";
import { Button,TextField ,Box} from '@mui/material';

function ManageUser() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 
  useEffect(() => {
    axios
      .post("http://localhost:5000/users/usersdata")
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
    UserName: "",
    Name: "",
    Gender: "",
    EmailId:"",
    ContactNo:"",

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
      .put(`http://localhost:5000/users/updateUser/${editedRowSlNo}`, editedData)
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

  const [deleteRowId, setDeleteRowId] = useState(null);

  const handleDeleteClick = (SlNo) => {
    setDeleteRowId(SlNo);
  };

  const handleDeleteConfirmation = () => {
    axios
      .delete(`http://localhost:5000/users/deleteUser/${deleteRowId}`)
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
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newData, setNewData] = useState({
    SlNo: '',
    UserName: '',
    Name: '',
    Gender: '',
    EmailId:'',
    ContactNo:'',
  });

  const handleAddClick = () => {
    setOpenAddDialog(true);
  };

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setNewData({
      SlNo: '',
     UserName: '',
     Name: '',
     Gender: '',
     EmailId:'',
     ContactNo:'',
    });
  };

  const handleAddSaveClick = () => {
    // You can perform API call here to save the new data to the backend
    // For simplicity, let's just update the state for now.
    axios
      .post("http://localhost:5000/users/insertUser", newData)
      .then((response) => {
        console.log("User added successfully!", response.data);
        fetchData(); // Refresh the data after adding
      })
      .catch((error) => {
        console.error("Error adding user:", error);
      });
    handleAddDialogClose();
  };

 const fetchData = () => {
  axios
    .get("http://localhost:5000/users/usersdata")
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
if (loading) {
    return <div>Loading...</div>;
  }
const columns = [
    { field: 'SlNo', headerName: 'SlNo', flex: 1 },
    { field: 'UserName', headerName: 'UserName', flex: 1 },
    { field: 'Name', headerName: 'Name', flex: 1 },
    { field: 'Gender', headerName: 'Gender', flex: 1 },
  { field: 'EmailId', headerName: 'Email Id', flex: 1 },
  { field: 'ContactNo', headerName: 'ContactNo', flex: 1 },
    // Add more columns as needed
    {
      field: 'actions',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEditClick(params.id)}>
            <EditOutlined />
          </IconButton>
          <IconButton >
            <EyeOutlined />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(params.id)}>
            <DeleteOutlined />
          </IconButton>
        </div>
      ),
    },
  ];
  const rows = data.map((usersdata) => ({
    id: usersdata.SlNo, // Assign the 'SlNo' as a unique identifier
    ...usersdata,
  }));
  return (
    <>
      <div className="show">
           <center>
          <h2 align="left">Users</h2>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button align="right" onClick= {handleAddClick}>
            <PlusOutlined/>ADD USER</button>
            </center>
 </div>

<center>
   <Box sx={{ height: '100%', width: '80%', marginTop: '10px' }}>

    <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            autoHeight
            disableSelectionOnClick
            // Set to true if you want to add checkboxes for selection
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
                  label="UsersName"
                  value={editedData.UserName}
                  onChange={(e) =>
                    setEditedData({ ...editedData, UserName: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Name"
                  value={editedData.Name}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      Name: e.target.value,
                    })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Gender"
                  value={editedData.Gender}
                  onChange={(e) =>
                    setEditedData({ ...editedData, Gender: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="EmailId"
                  value={editedData.EmailId}
                  onChange={(e) =>
                    setEditedData({ ...editedData, EmailId: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="ContactNo"
                  value={editedData.ContactNo}
                  onChange={(e) =>
                    setEditedData({ ...editedData, ContactNo: e.target.value })
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
            label="UserName"
            value={newData.UserName}
            onChange={(e) => setNewData({ ...newData, UserName: e.target.value })}
            fullWidth
          />
          <TextField
            label="Name"
            value={newData.Name}
            onChange={(e) => setNewData({ ...newData,Name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Gender"
            value={newData.Gender}
            onChange={(e) => setNewData({ ...newData, Gender: e.target.value })}
            fullWidth
          />
           <TextField
            label="EmailId"
            value={newData.EmailId}
            onChange={(e) => setNewData({ ...newData, EmailId: e.target.value })}
            fullWidth
          />
           <TextField
            label="ContactNo"
            value={newData.ContactNo}
            onChange={(e) => setNewData({ ...newData, ContactNo: e.target.value })}
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
      
    </>
    
  );
}


export default ManageUser
