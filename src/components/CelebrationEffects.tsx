import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CelebrationEffectsProps {
  isActive: boolean;
}

const ConfettiPiece = styled(Box)<{ delay: number; duration: number; startX: number }>(({ delay, duration, startX }) => ({
  position: 'absolute',
  width: '10px',
  height: '10px',
  backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
  top: '-20px',
  left: `${startX}%`,
  animation: `confettiFall ${duration}s linear ${delay}s infinite`,
  borderRadius: Math.random() > 0.5 ? '50%' : '0',
  transform: `rotate(${Math.random() * 360}deg)`,
  '@keyframes confettiFall': {
    '0%': {
      transform: 'translateY(-20px) rotate(0deg)',
      opacity: 1
    },
    '100%': {
      transform: 'translateY(100vh) rotate(720deg)',
      opacity: 0
    }
  }
}));

const FloatingEmoji = styled(Typography)<{ delay: number; startX: number }>(({ delay, startX }) => ({
  position: 'absolute',
  fontSize: '2rem',
  top: '50%',
  left: `${startX}%`,
  animation: `floatUp 3s ease-out ${delay}s forwards`,
  '@keyframes floatUp': {
    '0%': {
      transform: 'translateY(0) scale(0)',
      opacity: 0
    },
    '20%': {
      transform: 'translateY(-20px) scale(1)',
      opacity: 1
    },
    '100%': {
      transform: 'translateY(-200px) scale(1.5)',
      opacity: 0
    }
  }
}));

const PulsingHeart = styled(Typography)<{ delay: number }>(({ delay }) => ({
  position: 'absolute',
  fontSize: '3rem',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  animation: `heartPulse 1s ease-in-out ${delay}s infinite`,
  '@keyframes heartPulse': {
    '0%, 100%': {
      transform: 'translate(-50%, -50%) scale(1)',
    },
    '50%': {
      transform: 'translate(-50%, -50%) scale(1.3)',
    }
  }
}));

const CelebrationEffects: React.FC<CelebrationEffectsProps> = ({ isActive }) => {
  const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; delay: number; duration: number; startX: number }>>([]);
  const [emojis] = useState(['💕', '❤️', '💖', '💝', '🌟', '✨', '🎉', '🥳']);

  useEffect(() => {
    if (isActive) {
      // Generate confetti pieces
      const pieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 2,
        startX: Math.random() * 100
      }));
      setConfettiPieces(pieces);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1000,
        overflow: 'hidden'
      }}
    >
      {/* Confetti */}
      {confettiPieces.map((piece) => (
        <ConfettiPiece
          key={piece.id}
          delay={piece.delay}
          duration={piece.duration}
          startX={piece.startX}
        />
      ))}

      {/* Floating Emojis */}
      {emojis.map((emoji, index) => (
        <FloatingEmoji
          key={index}
          delay={index * 0.2}
          startX={10 + (index * 10)}
        >
          {emoji}
        </FloatingEmoji>
      ))}

      {/* Pulsing Hearts */}
      <PulsingHeart delay={0}>💕</PulsingHeart>
      <PulsingHeart delay={0.5} sx={{ left: '30%' }}>❤️</PulsingHeart>
      <PulsingHeart delay={1} sx={{ left: '70%' }}>💖</PulsingHeart>

      {/* Background celebration image */}
      <Box
        component="img"
        src="https://images.unsplash.com/photo-1557801200-9a8d901ded2a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxjb25mZXR0aSUyMGNlbGVicmF0aW9uJTIwcGFydHklMjBjb2xvcmZ1bCUyMGZlc3RpdmV8ZW58MHwwfHx8MTc1NDkzMTMyN3ww&ixlib=rb-4.1.0&q=85"
        alt="Celebration confetti background - Jason Dent on Unsplash"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.3,
          animation: 'fadeInOut 4s ease-in-out',
          '@keyframes fadeInOut': {
            '0%': { opacity: 0 },
            '50%': { opacity: 0.3 },
            '100%': { opacity: 0 }
          }
        }}
      />
    </Box>
  );
};

export default CelebrationEffects;