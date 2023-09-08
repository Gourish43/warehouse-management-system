import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import { Button ,Box} from "@mui/material";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import moment from 'moment';
function ManageRole() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
 

  
  useEffect(() => {
    axios
      .post("http://localhost:5000/role/managerole")
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
    RoleName: "",
  RoleDescription: "",
    RoleDate: "",
    RoleTime: "",
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
      .put(`http://localhost:5000/role/updaterole/${editedRowSlNo}`, editedData)
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
    SlNo: '',
    RoleName: '',
  RoleDescription: '',
    RoleDate: '',
    RoleTime: '',
  });


  const handleAddClick = () => {
    setOpenAddDialog(true);
    
    // Set RoleTime using moment library
    setNewData((prevData) => ({
      ...prevData,
      RoleTime: moment().format('HH:mm'),
    }));
    
    // Set RoleDate in day-month-year format using moment library
    const currentDate = moment().format('DD-MM-YYYY');
    setNewData((prevData) => ({
      ...prevData,
      RoleDate: currentDate,
    }));
  };  

  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
    setNewData({
      SlNo: "",
    RoleName: "",
  RoleDescription: "",
    RoleDate: "",
    RoleTime: "",
    });
  };

  const handleAddSaveClick = () => {
    // You can perform API call here to save the new data to the backend
    // For simplicity, let's just update the state for now.
    axios
      .post("http://localhost:5000/role/insertrole", newData)
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
    .get("http://localhost:5000/role/managerole")
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
    { field: "SlNo", headerName: "SlNo",flex: 1  },
    { field: "RoleName", headerName: "Role Name", flex: 1 },
    { field: "RoleDescription", headerName: "Role Description",flex: 1 },
    { field: "RoleDate", headerName: "Role Date",flex: 1  },
    { field: "RoleTime", headerName: "Role Time",flex: 1  },
 
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div>
          <button onClick={() => handleEditClick(params.id)}>edit</button>
         
        </div>
      ),
    },
  ];

  const rows = data.map((managerole) => ({
    id: managerole.SlNo, // Assign the 'SlNo' as a unique identifier
    ...managerole,
  }));

  return (
    <>
      <div className="show">
        <center>
          <h2 align="left">Manage Role </h2>
          <button align="right" type="primary" onClick={handleAddClick}>
            <PlusOutlined />
            Add Role
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
                  label="RoleName"
                  value={editedData.RoleName}
                  onChange={(e) =>
                    setEditedData({ ...editedData, RoleName: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="RoleDescription"
                  value={editedData.RoleDescription}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                     RoleDescription: e.target.value,
                    })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="RoleDate"
                  value={editedData.RoleDate}
                  onChange={(e) =>
                    setEditedData({ ...editedData, RoleDate: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="RoleTime"
                  value={editedData.RoleTime}
                  onChange={(e) =>
                    setEditedData({ ...editedData, RoleTime: e.target.value })
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
            label="RoleName"
            value={newData.RoleName}
            onChange={(e) => setNewData({ ...newData, RoleName: e.target.value })}
            fullWidth
          />
          <TextField
            label="RoleDescription"
            value={newData.RoleDescription}
            onChange={(e) => setNewData({ ...newData, RoleDescription: e.target.value })}
            fullWidth
          />
          <TextField
            type="date"
            value={newData.RoleDate}
            onChange={(e) => setNewData({ ...newData, RoleDate: e.target.value })}
            fullWidth
          />
          <TextField
            type="time"
            value={newData.RoleTime}
            onChange={(e) => setNewData({ ...newData, RoleTime: e.target.value })}
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


export default ManageRole