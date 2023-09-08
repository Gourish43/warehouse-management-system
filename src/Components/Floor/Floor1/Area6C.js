

import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

function AreaComponent3() {

    const renderAreaComponents = () => {

        const cardData = [];

        // Generate an array with 432 elements, each element representing a card
        const totalCards = Array.from({ length: 48 });

        // Using map function to iterate through the totalCards array and generate Card components
        cardData.push(
            totalCards.map((_, index) => (
                <Grid item key={index}>
                    <Card
                        style={{
                            width: '20px',
                            height: '20px',
                            border: '1px solid black',
                            cursor: 'pointer',
                            padding: '1px',
                        }} 
                    >
                    </Card>
                </Grid>
            ))
        );
        return cardData;
    };


  return (
    <div >
        <Grid container spacing={0.5} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}>
          {renderAreaComponents()}      
        </Grid>
    </div>
  )
}

export default AreaComponent3;