import React, { useState, useEffect } from 'react';
import './FloorVisualize.css';

const GridRow = ({ handleClick }) => {
  const gridItems = [];
  for (let i = 1; i <= 52; i++) {
    gridItems.push(
      <div key={i} className="grid-item" onClick={() => handleClick(i)}></div>
    );
  }

  return <div className="grid-row">{gridItems}</div>;
};

const BlockInsideGrid = ({ targetPosition }) => {
  return <div className="block" style={{ left: `${(targetPosition - 1) * 24}px` }}></div>;
};

const FloorVisual = () => {
  const [clickedPosition, setClickedPosition] = useState(1);

  useEffect(() => {
    // Retrieve the position from the backend when the component mounts
    getPositionFromBackend().then((position) => {
      setClickedPosition(position);
    });
  }, []);

  const handleClick = async (position) => {
    setClickedPosition(position);
    
    // Save the new position to the backend
    await setPositionOnBackend(position);
  };

  const setPositionOnBackend = async (position) => {
    try {
      await fetch('http://localhost:5000/blockposition/setPosition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ position }),
      });
      } catch (error) {
      // Handle errors
    }
  };
  
  const getPositionFromBackend = async () => {
    try {
      const response = await fetch('http://localhost:5000/blockposition/getPosition');
      const data = await response.json();
      return data.position;
    } catch (error) {
      // Handle errors
      return 1; // Default position if retrieval fails
    }
  };

  return (
    <div className="grid-container">
      <GridRow handleClick={handleClick} />
      <BlockInsideGrid targetPosition={clickedPosition} />
    </div>
  );
};

export default FloorVisual;