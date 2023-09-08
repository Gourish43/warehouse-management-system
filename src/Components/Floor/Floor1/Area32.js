import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close';

function CardComponent4() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [cardLocks, setCardLocks] = useState(new Array(51).fill(false));
    const [cardClose, setCardClose] = useState(new Array(51).fill(false));
    const [cardList, setcardList] = useState([]);
    const [cardColors, setCardColors] = useState(new Array(51).fill('white'));
    const [dialogWidth, setDialogWidth] = useState('md');

    const [cardInformation, setcardInformation] = useState({
        quantity: '',
        skuName: '',
        skuCode: '',
        batchNumber: '',
        productName: '',
        productionOrderNo: '',
        loadDate: '',
        palletCode: '',
    });

    
    const handleOpenDialog = (index, width) => {
        setDialogOpen(true);
        setSelectedCardIndex(index);
        setDialogWidth(width);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setcardInformation({
            quantity: '',
            skuName: '',
            skuCode: '',
            batchNumber: '',
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setcardInformation((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const handleAddcard = () => {
        const newcardList = [...cardList, cardInformation];
        setcardList(newcardList);
        setcardInformation({
            quantity: '',
            skuName: '',
            skuCode: '',
            batchNumber: '',
        });
    };

    const handleColorChange = (index, color) => {
        const newCardColors = [...cardColors];
        newCardColors[index] = color;
        setCardColors(newCardColors);

        const newCardLocks = [...cardLocks];
        newCardLocks[index] = color === 'red'; // Set lock to true only if color is red
        setCardLocks(newCardLocks);

        const newCardClose = [...cardClose];
        newCardClose[index] = color === 'black';
        setCardClose(newCardClose);
    };

    const renderCardComponents = () => {
        const cardData = [];
        for (let row = 0; row < 17; row++) {
            for (let col = 0; col < 3; col++) {
                const index = row * 3 + col;
                cardData.push(
                        <Grid item key={index}>
                            <Card
                                style={{
                                    width: '20px',
                                    height: '19px',
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
                                    {cardClose[index] && <CloseIcon style={{ color: 'white', justifyContent: 'center', alignItems: 'center', fontWeight: 'bolder' }} />}
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
                <DialogTitle>Rack Number</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
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
                        <Grid item xs={6}>
                            <TextField
                                label="SKU Name"
                                name="skuName"
                                value={cardInformation.skuName}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="SKU Code"
                                name="skuCode"
                                value={cardInformation.skuCode}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Batch Number"
                                name="batchNumber"
                                value={cardInformation.batchNumber}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} justifyContent="center">
                                <Grid item>
                                    <Button onClick={() => handleColorChange(selectedCardIndex, 'red')} variant="contained" color="primary" style={{ backgroundColor: 'black' }}
                                    >
                                        Lock Rack
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => handleColorChange(selectedCardIndex, 'blue')} variant="contained" color="primary" style={{ backgroundColor: 'black' }}
                                    >
                                        Rack Transfer
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => handleColorChange(selectedCardIndex, 'green')} variant="contained" color="primary" style={{ backgroundColor: 'black' }}
                                    >
                                        Manual Pallet Dispatch
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => handleColorChange(selectedCardIndex, 'yellow')} variant="contained" color="primary" style={{ backgroundColor: 'black' }}
                                    >
                                        Position Lock
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => handleColorChange(selectedCardIndex, 'black')} variant="contained" style={{ backgroundColor: 'black' }}
                                    >
                                        Data Delete
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper} style={{ marginTop: '2rem' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>SKU Name</TableCell>
                                    <TableCell>SKU Code</TableCell>
                                    <TableCell>Batch Number</TableCell>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Production Order No</TableCell>
                                    <TableCell>Load Date</TableCell>
                                    <TableCell>Pallet Code</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cardList.map((card, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{card.quantity}</TableCell>
                                        <TableCell>{card.skuName}</TableCell>
                                        <TableCell>{card.skuCode}</TableCell>
                                        <TableCell>{card.batchNumber}</TableCell>
                                        <TableCell>{card.productName}</TableCell>
                                        <TableCell>{card.productionOrderNo}</TableCell>
                                        <TableCell>{card.loadDate}</TableCell>
                                        <TableCell>{card.palletCode}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} style={{ Color: 'black' }}
                    >Cancel</Button>
                    <Button onClick={handleAddcard} variant="contained" color="primary" style={{ backgroundColor: 'black' }}
                    >
                        Add Product
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default CardComponent4;