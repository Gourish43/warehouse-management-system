

import React from 'react';
import './FloorVisualize.css';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import CardComponent1 from '../Floor/Floor1/Area1';
import CardComponent2 from '../Floor/Floor1/Area2';
import CardComponent3 from '../Floor/Floor1/Area3';
import CardComponent4 from '../Floor/Floor1/Area32';
import CardComponent5 from '../Floor/Floor1/Area4';
import FloorVisual from './FloorVisual';
import AreaComponent1 from '../Floor/Floor1/Area6A';
import AreaComponent2 from '../Floor/Floor1/Area6B';
import AreaComponent3 from '../Floor/Floor1/Area6C';

const FloorVisualize = () => {
    const renderCardComponents = () => {
        const cardData = [];
        for (let row = 0; row < 1; row++) {
            for (let col = 0; col < 52; col++) {
                const index = row * 52 + col;
                const cardNumber = index + 1; // Calculate the card number

                cardData.push(
                    <Grid item key={index} >
                        <Box
                            style={{
                                width: '20px',
                                height: '20px',
                                border: '1px solid white',
                                cursor: 'pointer',
                                padding: '1px',
                                backgroundColor: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '15px',
                            }}
                        >
                            {cardNumber}
                        </Box>
                    </Grid>
                );
            }
        }
        return cardData;
    };
    const renderCardComponents1 = () => {
        const cardData = [];
        for (let row = 0; row < 1; row++) {
            for (let col = 0; col < 49; col++) {
                const index = row * 49 + col;
                const cardNumber = index + 1; // Calculate the card number

                cardData.push(
                    <Grid item key={index} >
                        <Box
                            style={{
                                width: '20px',
                                height: '20px',
                                border: '1px solid white',
                                cursor: 'pointer',
                                padding: '1px',
                                backgroundColor: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '15px',
                            }}
                        >
                            {cardNumber}
                        </Box>
                    </Grid>
                );
            }
        }
        return cardData;
      };
      
    return (
        <div className="main_container">
            <h2 style={{ fontSize: '20px', textAlign: 'left',paddingTop:'1px' }}>Floor Visualization</h2>
            <div className='AlignLeft'>
                            <ul style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridGap: '40px', listStyleType: 'none', padding: '20px', gridAutoFlow: 'column' }}>
                                <li id="a_seat">
                                    <div className="cell" style={{ marginRight: '2px' }}>
                                        <i class="fas fa-times" style={{ color: 'white' }}></i>
                                    </div>
                                    <span style={{ whiteSpace: 'nowrap' }}> Dead Cell</span>
                                </li>
                                <li id="b_seat">
                                    <div className="cell"></div>
                                    <span style={{ whiteSpace: 'nowrap' }}> Empty Cell</span>
                                    
                                </li>
                                <li id="s_seat">
                                    <div className="cell"></div>
                                    <span style={{ whiteSpace: 'nowrap' }}> Storage Cell</span>
                                   
                                </li>
                                <li id="h_seat" style={{ alignItems: 'center' }}>
                                    <div className="cell" style={{ marginRight: '5px' }}>
                                        <i className="fas fa-lock" style={{ color: 'black' }}></i>
                                    </div>
                                    <span style={{ whiteSpace: 'nowrap' }}> Lock Cell</span>
                                   
                                </li>
                                <li id="m_seat">
                                    <div className="cell"></div>
                                    <span style={{ whiteSpace: 'nowrap' }}> Manual Pallet Cell</span>
                                   
                                </li>
                                <li id="e_seat">
                                    <div className="cell"></div>
                                    <span style={{ whiteSpace: 'nowrap' }}>Error Cell</span>
                                    
                                </li>
                                <li id="c_seat">
                                    <div className="cell"></div>
                                    <span style={{ whiteSpace: 'nowrap' }}>Conveyar</span>
                                    
                                </li>
                                <li id="d_seat">
                                    <div className="cell"></div>
                                    <span style={{ whiteSpace: 'nowrap' }}>Conveyar Mov</span>
                                    
                                </li>
                                <li id="l_seat" style={{ alignItems: 'center' }}>
                                    <div className="cell" style={{ marginRight: '5px' }}>
                                        <i className="fas fa-lock" style={{ color: 'blue' }}></i>
                                    </div>
                                    <span style={{ whiteSpace: 'nowrap' }}> Floor Control</span>
                                   
                                </li>
                            </ul>
            </div>
           

                    <div className='boder'>
                        <div className='inner-partition' style={{ height: '35px', marginTop: '1px' }}>
                            <Grid container spacing={0.5} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }} style={{ paddingLeft: '60px', }}>
                            {renderCardComponents()}
                            </Grid>
                        </div>
                        <div className='cardMargin'> <CardComponent1 /></div>
                        <div className='mid-partition' style={{ height: '48px', marginTop: '1px' }}>
                        <Grid container spacing={0.1} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }} style={{ paddingLeft: '60px', }}>
                               <FloorVisual/>
                            </Grid>
                        </div>
                        <div>
                        <div className="parent-container">
                            <div className="vertical-div1"><CardComponent2 /></div>
                        </div>
                         <div className='Separation-line '>
                         <div className="vertical-div3"><CardComponent3/></div>
                         <div className="vertical-div4"><CardComponent4/>
                        </div>
                        </div>
                        <div className='end-partition' style={{ height: '48px', marginTop: '195px' }}>
                        <Grid container spacing={0.1} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }} style={{ paddingLeft: '60px', }}>
                               <FloorVisual/>
                            </Grid>
                        </div>
                        <div className='parent-container2 '>
                          <div className="vertical-div3"><CardComponent5/></div>
                        </div>
                        <div className='Separation-line2 '></div>
                         <div className="vertical-div5"><AreaComponent1/> </div>
                         <div className="vertical-div6"><AreaComponent2/></div>
                         <div className="vertical-div7"><AreaComponent3/></div>
                        <div style={{border:'1px solid white', marginLeft:'62px'}}>
                        <Grid container spacing={0.5} columns={{ xs: 4, sm: 8, md: 12, lg: 16 }} >
                           {renderCardComponents1()}
                            </Grid>
                        </div>
                    </div>
               </div>
        </div>
    );
};
export default FloorVisualize;