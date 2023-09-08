import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { DataGrid} from '@mui/x-data-grid';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ApplicationStore from '../../../utility/ApplicationStorage';
import Box from '@mui/material/Box'; // Add this import for Box

const columns = [
    { field: 'id', headerName: 'ID', width: 60, editable: true },
    { field: 'quantity', headerName: 'Quantity', width: 85, editable: true },
    { field: 'skuName', headerName: 'SKU Name', width: 105, editable: true },
    { field: 'skuCode', headerName: 'SKU Code', width: 105, editable: true },
    { field: 'batchNumber', headerName: 'Batch Number', width: 135, editable: true },
    { field: 'productionOrderNo', headerName: 'Production Order No', width: 185, editable: true },
    { field: 'palletCode', headerName: 'Pallet Code', width: 105, editable: true },
    { field: 'productName', headerName: 'Product Name', width: 140, editable: true },
    { field: 'status', headerName: 'Status', width: 105, editable: true },
    { field: 'loadDate', headerName: 'Load Date', width: 120, editable: true },
  ];
const CardComponent5= () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [cardLocks, setCardLocks] = useState(new Array(528).fill(false));
    const [cardClose, setCardClose] = useState(new Array(528).fill(false));
    const [cardInformation, setCardInformation] = useState({
        quantity: '',
        skuName: '',
        skuCode: '',
        batchNumber: '',
        productionOrderNo: '',
        palletCode: '',
        productName: '',
        status: '',
        loadDate: ''
    });
    const handleClearInformation = () => {
        if (selectedCardIndex !== null) {
            // Send a DELETE request to the backend server
            fetch(`http://localhost:5000/deleteProduct/${cardList[selectedCardIndex].id}`, {
                method: 'DELETE',
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Product deleted successfully!', data);

                    // Clear the data for the selected card in the frontend
                    const newCardList = [...cardList];
                    newCardList.splice(selectedCardIndex, 1);
                    setcardList(newCardList);

                    const newCardColors = [...cardColors];
                    newCardColors[selectedCardIndex] = 'white';
                    setCardColors(newCardColors);

                    const newCardLocks = [...cardLocks];
                    newCardLocks[selectedCardIndex] = false;
                    setCardLocks(newCardLocks);

                    const newCardClose = [...cardClose];
                    newCardClose[selectedCardIndex] = false;
                    setCardClose(newCardClose);

                    // Save the updated cardList and cardColors to localStorage after clearing the data
                    localStorage.setItem('cardList', JSON.stringify(newCardList));
                    localStorage.setItem('cardColors', JSON.stringify(newCardColors));

                    // Clear the cardInformation state
                    setCardInformation({
                        quantity: '',
                        skuName: '',
                        skuCode: '',
                        batchNumber: '',
                        productionOrderNo: '',
                        palletCode: '',
                        productName: '',
                        status: '',
                        loadDate: '',
                    });
                })
                .catch((error) => {
                    console.error('Error deleting product:', error);
                });

            //   setDeleteRowId(null); // Clear the deleteRowId
            handleCloseDialog(); // Close the dialog after successful deletion
        }
    };
    const [cardList, setcardList] = useState([]);
    const [cardColors, setCardColors] = useState(new Array(432).fill('white'));

    const handleOpenDialog = (index, width) => {
        setDialogOpen(true);
        setSelectedCardIndex(index);
        setDialogWidth(width);
    };

    const [dialogWidth, setDialogWidth] = useState('md');

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCardInformation((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    useEffect(() => {
        const storedCardList = JSON.parse(localStorage.getItem('cardList'));
        if (storedCardList) {
            setcardList(storedCardList);
        }
    }, []);

    useEffect(() => {
        // Retrieve stored card colors from localStorage
        const storedCardColors = JSON.parse(localStorage.getItem('cardColors'));
        if (storedCardColors) {
            setCardColors(storedCardColors);
        }

        // Retrieve stored card list from localStorage
        const storedCardList = JSON.parse(localStorage.getItem('cardList'));
        if (storedCardList) {
            setcardList(storedCardList);
        }
    }, []);

    const handleAddProd = () => {
        if (
            cardInformation.quantity.trim() === '' ||
            cardInformation.skuName.trim() === '' ||
            cardInformation.skuCode.trim() === '' ||
            cardInformation.batchNumber.trim() === '' ||
            cardInformation.productionOrderNo.trim() === '' ||
            cardInformation.productName === '' ||
            cardInformation.palletCode.trim() === '' ||
            cardInformation.status === '' ||
            cardInformation.loadDate === ''
        ) {
            window.alert('Please fill all the required fields.');
            return;
        }
        const newCardList = [
            ...cardList,
            {
                ...cardInformation,
                id: cardList.length,
                status: cardInformation.status,
                loadDate: cardInformation.loadDate,
                productName: cardInformation.productName,
            },
        ];

        setCardInformation({
            quantity: '',
            skuName: '',
            skuCode: '',
            batchNumber: '',
            productionOrderNo: '',
            palletCode: '',
            productName: '',
            status: '',
            loadDate: '',
        });
        setDialogOpen(true);

        const store = ApplicationStore();
        store.setStorage();



        // Send a POST request to the backend server
        fetch('http://localhost:5000/floorcell2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cardInformation),
        })
            .then((response) => response.json())
            .then((data) => {
                window.alert('Product added successfully:', data);
                handleColorChange(selectedCardIndex, 'green');

                // Save updated cardList to localStorage after successful addition
                localStorage.setItem('cardList', JSON.stringify(newCardList));
            })
            .catch((error) => {
                console.error('Error adding product:', error);
            });
    };

    const handleColorChange = (index, color) => {
        const newCardColors = [...cardColors];
        newCardColors[index] = color;
        setCardColors(newCardColors);

        const newCardLocks = [...cardLocks];
        newCardLocks[index] = color === 'red';
        setCardLocks(newCardLocks);

        const newCardClose = [...cardClose];
        newCardClose[index] = color === 'black';
        setCardClose(newCardClose);

        // Store the updated card colors in localStorage
        localStorage.setItem('cardColors', JSON.stringify(newCardColors));
    };

    const renderCardComponents = () => {
        const cardData = [];
        for (let row = 0; row < 11; row++) {
            for (let col = 0; col < 48; col++) {
                const index = row * 48 + col;
                cardData.push(
                    <Grid item key={index}>
                        <Card
                            style={{
                                width: '20px',
                                height: '20px',
                                border: '1px solid black',
                                cursor: 'pointer',
                                padding: '1px',
                                backgroundColor: cardColors[index],
                            }}
                            onClick={() => handleOpenDialog(index, 'lg')}
                        >
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {cardLocks[index] && <LockIcon style={{ justifyContent: 'center', alignItems: 'center' }} />}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                {cardClose[index] && (
                                    <CloseIcon style={{ color: 'white', justifyContent: 'center', alignItems: 'center', fontWeight: 'bolder' }} />
                                )}
                            </div>
                        </Card>
                    </Grid>
                );
            }
        }
        return cardData;
    };

    return (
        <div>
            <Grid container spacing={0.5} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
                {renderCardComponents()}
            </Grid>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth={dialogWidth}>
                <DialogTitle
                    edge="left"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1px',
                        padding: '2px',
                        backgroundColor: 'black',
                        color: 'white',
                    }}
                >
                    <div>Rack 2BL{selectedCardIndex + 1}</div>
                    <IconButton edge="right" onClick={handleCloseDialog} aria-label="close" style={{ color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                label="Quantity"
                                name="quantity"
                                value={cardInformation.quantity}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                label="SKU Name"
                                name="skuName"
                                value={cardInformation.skuName}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                label="SKU Code"
                                name="skuCode"
                                value={cardInformation.skuCode}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                label="Batch Number"
                                name="batchNumber"
                                value={cardInformation.batchNumber}
                                onChange={handleInputChange}
                                fullWidth
                                marginTop="-5px"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                label="Production Order No"
                                name="productionOrderNo"
                                value={cardInformation.productionOrderNo}
                                onChange={handleInputChange}
                                fullWidth
                                marginTop="-5px"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                select
                                name="productName"
                                value={cardInformation.productName}
                                onChange={handleInputChange}
                                fullWidth
                                marginTop="-5px"
                                SelectProps={{ native: true }} // Use native rendering for the select element
                            >
                                <option value="">Select Product</option>
                                <option value="Pouch">Pouch</option>
                                <option value="Jar">Jar</option>
                                <option value="Tin">Tin</option>
                                <option value="Bottle">Bottle</option>
                                <option value="Other">Other</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField
                                label="Pallet Code"
                                name="palletCode"
                                value={cardInformation.palletCode}
                                onChange={handleInputChange}
                                fullWidth
                                marginTop="1px"                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={4}>

                            <TextField
                                select
                                name="status"
                                value={cardInformation.status}
                                onChange={handleInputChange}
                                fullWidth
                                marginTop="-5px"                               
                                 SelectProps={{ native: true }} // Use native rendering for the select element
                            >
                                <option value="">Select Status</option>
                                <option value="Completed">Completed</option>
                                <option value="InProgress">InProgress</option>
                                <option value="Ready">Ready</option>

                            </TextField>

                        </Grid>


                        <Grid item xs={12} sm={6} md={4} lg={4}>
                            <TextField type="date" name="loadDate" marginTop="-5px" fullWidth value={cardInformation.loadDate} onChange={handleInputChange} />
                        </Grid>

                        <Grid item xs={12}>
                            <Grid container spacing={1} justifyContent="center">
                                <Grid item>
                                    <Button
                                        onClick={() => handleColorChange(selectedCardIndex, 'red')}
                                        variant="contained"
                                        color="primary"
                                        style={{ backgroundColor: 'black' }}
                                    >
                                        Lock Rack
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={() => handleColorChange(selectedCardIndex, 'blue')}
                                        variant="contained"
                                        color="primary"
                                        style={{ backgroundColor: 'black' }}
                                    >
                                        Rack Transfer
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={() => handleColorChange(selectedCardIndex, 'green')}
                                        variant="contained"
                                        color="primary"
                                        style={{ backgroundColor: 'black' }}
                                    >
                                        Manual Pallet Dispatch
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        onClick={() => handleColorChange(selectedCardIndex, 'yellow')}
                                        variant="contained"
                                        color="primary"
                                        style={{ backgroundColor: 'black' }}
                                    >
                                        Position Lock
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => handleColorChange(selectedCardIndex, 'black')} variant="contained" style={{ backgroundColor: 'black' }}>
                                        Data Delete
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <div>
                    <Box sx={{ height: '100%', width: '100%', marginTop:'10px' }}>
                        <DataGrid
                             columns={columns}
                             initialState={{
                               pagination: {
                                 paginationModel: {
                                   pageSize: 6,
                                 },
                               },
                             }}
                             pageSizeOptions={[12]}
                           
                            rows={cardList}
                           
                        />
                        </Box>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClearInformation();// Call the handleClearInformation function
                        handleCloseDialog();
                    }}
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: 'red' }}
                    >Unload</Button>
                    <Button
                        onClick={handleAddProd}
                        variant="contained"
                        color="primary"
                        style={{ backgroundColor: 'green' }}
                    >
                        Load
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CardComponent5;