import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

interface MovingNoButtonProps {
  onClick: () => void;
  clickCount: number;
}

const MovingButton = styled(Button)<{ 
  position: { x: number; y: number }; 
  shouldHide: boolean;
  clickCount: number;
}>(({ position, shouldHide, clickCount }) => ({
  position: 'absolute',
  left: `${position.x}px`,
  top: `${position.y}px`,
  fontSize: `${Math.max(0.6, 1 - clickCount * 0.08)}rem`,
  padding: `${Math.max(4, 12 - clickCount * 1.5)}px ${Math.max(8, 24 - clickCount * 3)}px`,
  minWidth: `${Math.max(50, 120 - clickCount * 8)}px`,
  minHeight: `${Math.max(28, 48 - clickCount * 2.5)}px`,
  opacity: shouldHide ? 0 : Math.max(0.4, 1 - clickCount * 0.08),
  transform: shouldHide ? 'scale(0.5) rotate(180deg)' : 'scale(1)',
  transition: 'all 0.3s ease-in-out',
  zIndex: 1,
  pointerEvents: shouldHide ? 'none' : 'auto',
  boxShadow: shouldHide ? 'none' : '0 2px 8px rgba(255, 87, 34, 0.3)',
  '&:hover': {
    transform: shouldHide ? 'scale(0.5) rotate(180deg)' : 'scale(0.8) rotate(-10deg)',
    opacity: shouldHide ? 0 : 0.7,
  }
}));

const MovingNoButton: React.FC<MovingNoButtonProps> = ({ onClick, clickCount }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [shouldDisappear, setShouldDisappear] = useState(false);

  // Generate random position within viewport bounds
  const generateRandomPosition = () => {
    const maxX = Math.max(200, window.innerWidth - 150);
    const maxY = Math.max(200, window.innerHeight - 100);
    const minX = 50;
    const minY = 100;
    
    return {
      x: Math.random() * (maxX - minX) + minX,
      y: Math.random() * (maxY - minY) + minY
    };
  };

  // Move button on each click
  useEffect(() => {
    if (clickCount > 0) {
      setPosition(generateRandomPosition());
    }
  }, [clickCount]);

  // Handle hover disappearing after 5 clicks
  const handleMouseEnter = () => {
    if (clickCount >= 5) {
      setShouldDisappear(true);
      // Reset after a short delay
      setTimeout(() => {
        setShouldDisappear(false);
        setPosition(generateRandomPosition());
      }, 1000);
    }
  };

  const handleMouseLeave = () => {
    // Mouse leave handler
  };

  const handleClick = () => {
    onClick();
    setPosition(generateRandomPosition());
  };

  return (
    <MovingButton
      variant="contained"
      color="secondary"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      position={position}
      shouldHide={shouldDisappear}
      clickCount={clickCount}
    >
      {clickCount >= 8 ? '😭' : clickCount >= 5 ? 'Hayır!' : 'Hayır'}
    </MovingButton>
  );
};

export default MovingNoButton;