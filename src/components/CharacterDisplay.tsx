import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface CharacterDisplayProps {
  isHappy: boolean;
}

const CharacterContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2)
}));

const FloatingHeart = styled(Box)<{ delay: number }>(({ delay }) => ({
  position: 'absolute',
  fontSize: '1.5rem',
  color: '#FF6B6B',
  animation: `float 3s ease-in-out infinite ${delay}s`,
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0px) rotate(0deg)',
      opacity: 0.7
    },
    '50%': {
      transform: 'translateY(-20px) rotate(10deg)',
      opacity: 1
    }
  }
}));

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ isHappy }) => {
  // Funny character emoji based on state
  const getCharacterEmoji = () => {
    if (isHappy) return '🤗';
    return '🥺';
  };

  return (
    <CharacterContainer>
      {isHappy && (
        <>
          <FloatingHeart delay={0} sx={{ top: -20, left: -30 }}>💕</FloatingHeart>
          <FloatingHeart delay={1} sx={{ top: -10, right: -40 }}>❤️</FloatingHeart>
          <FloatingHeart delay={2} sx={{ top: -25, right: -10 }}>💖</FloatingHeart>
        </>
      )}
      
      <Box
        sx={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '8rem',
          background: isHappy 
            ? 'linear-gradient(135deg, #FFE0E6 0%, #E8F5E8 100%)'
            : 'linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)',
          border: '4px solid',
          borderColor: isHappy ? '#FF6B6B' : '#9E9E9E',
          transition: 'all 0.3s ease-in-out',
          boxShadow: isHappy 
            ? '0 8px 32px rgba(255, 107, 107, 0.3)' 
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
          animation: isHappy ? 'bounce 2s ease-in-out infinite' : 'wobble 3s ease-in-out infinite',
          '&:hover': {
            transform: 'scale(1.1)',
            borderColor: isHappy ? '#FF5252' : '#757575'
          },
          '@keyframes bounce': {
            '0%, 20%, 50%, 80%, 100%': {
              transform: 'translateY(0)'
            },
            '40%': {
              transform: 'translateY(-10px)'
            },
            '60%': {
              transform: 'translateY(-5px)'
            }
          },
          '@keyframes wobble': {
            '0%, 100%': {
              transform: 'rotate(0deg)'
            },
            '25%': {
              transform: 'rotate(-3deg)'
            },
            '75%': {
              transform: 'rotate(3deg)'
            }
          }
        }}
      >
        {getCharacterEmoji()}
      </Box>
    </CharacterContainer>
  );
};

export default CharacterDisplay;