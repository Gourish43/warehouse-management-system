import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { PlusOutlined, EditOutlined, EyeOutlined,DeleteOutlined } from '@ant-design/icons';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import { Button,TextField ,Box} from '@mui/material';

function ManageLoadingBayOutfeedPalette() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .post("http://localhost:5000/bayoutfeed/bayoutfeed")
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
    SlNo:'', TruckPositionName :'', ZotbNumber:'', TruckNumber:'',TruckInPresence:'',	LoadingStatus:'',TelescopicConveyorStatus:'',LoadingDateandTime:'',LoadingBayFixedPallet:'',LoadingBayCurrentPallet:''
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
      .put(`http://localhost:5000/bayoutfeed/updatebayoutfeed/${editedRowSlNo}`, editedData)
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
   
 const fetchData = () => {
  axios
    .get("http://localhost:5000/bayoutfeed/bayoutfeed")
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
    { field: "TruckPositionName", headerName: "Truck PositionName", flex: 1 },
    { field: "ZotbNumber", headerName: "ZotbNumber",flex: 1 },
    { field: "TruckNumber", headerName: "Truck Number",flex: 1  },
    { field: "TruckInPresence", headerName: "TruckInPresence",flex: 1  },
    { field: "LoadingStatus", headerName: "LoadingStatus",flex: 1  },
    { field: "TelescopicConveyorStatus", headerName: "Telescopic Conveyor Status",flex: 1  },
    { field: "LoadingDateandTime", headerName: "LoadingDate&Time",flex: 1  },
    { field: "LoadingBayFixedPallet", headerName: "LoadingBayFixedPallet",flex: 1  },
    { field: "LoadingBayCurrentPallet", headerName: "LoadingBayCurrentPallet",flex: 1  },
    
    {
      field: "actions",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEditClick(params.id)}><EditOutlined/></IconButton>
         
        </div>
      ),
    },
  ];

  const rows = data.map((bayoutfeed) => ({
    id: bayoutfeed.SlNo, // Assign the 'SlNo' as a unique identifier
    ...bayoutfeed,
  }));

  return (
    <>
      <div className="show">
        <center>
          <h2 align="left">Manage BayOutfeedPallet</h2>
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
                  label="TruckPositionName"
                  value={editedData.TruckPositionName}
                  onChange={(e) =>
                    setEditedData({ ...editedData, TruckPositionName: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="ZotbNumber"
                  value={editedData.ZotbNumber}
                  onChange={(e) =>
                    setEditedData({
                      ...editedData,
                      ZotbNumber: e.target.value,
                    })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="TruckNumber"
                  value={editedData.TruckNumber}
                  onChange={(e) =>
                    setEditedData({ ...editedData, TruckNumber: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="TruckInPresence"
                  value={editedData.TruckInPresence}
                  onChange={(e) =>
                    setEditedData({ ...editedData, TruckInPresence: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="LoadingStatus"
                  value={editedData.LoadingStatus}
                  onChange={(e) =>
                    setEditedData({ ...editedData, LoadingStatus: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="TelescopicConveyorStatus"
                  value={editedData.TelescopicConveyorStatus}
                  onChange={(e) =>
                    setEditedData({ ...editedData, TelescopicConveyorStatus: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
                            <Grid item xs={6}>
                <TextField
                  label="LoadingDateandTime"
                  value={editedData.LoadingDateandTime}
                  onChange={(e) =>
                    setEditedData({ ...editedData, LoadingDateandTime: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="LoadingBayFixedPallet"
                  value={editedData.LoadingBayFixedPallet}
                  onChange={(e) =>
                    setEditedData({ ...editedData, LoadingBayFixedPallet: e.target.value })
                  }
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="LoadingBayCurrentPallet"
                  value={editedData.LoadingBayCurrentPallet}
                  onChange={(e) =>
                    setEditedData({ ...editedData, LoadingBayCurrentPallet: e.target.value })
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
        
      </div>
 
     
    </>
  );
}

export default ManageLoadingBayOutfeedPalette