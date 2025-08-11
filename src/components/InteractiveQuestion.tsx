import React, { useState } from 'react';
import { Stack, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CharacterDisplay from './CharacterDisplay';
import MovingNoButton from './MovingNoButton';
import CelebrationEffects from './CelebrationEffects';

const GrowingButton = styled(Button)<{ growthLevel: number }>(({ growthLevel }) => ({
  fontSize: `${1 + growthLevel * 0.3}rem`,
  padding: `${12 + growthLevel * 4}px ${24 + growthLevel * 8}px`,
  minWidth: `${120 + growthLevel * 40}px`,
  minHeight: `${48 + growthLevel * 16}px`,
  transition: 'all 0.3s ease-in-out',
  zIndex: growthLevel > 3 ? 10 : 1,
  position: growthLevel > 7 ? 'fixed' : 'relative',
  top: growthLevel > 7 ? '50%' : 'auto',
  left: growthLevel > 7 ? '50%' : 'auto',
  transform: growthLevel > 7 ? 'translate(-50%, -50%) scale(2)' : `scale(${1 + growthLevel * 0.1})`,
}));

const InteractiveQuestion: React.FC = () => {
  const [noClickCount, setNoClickCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleNoClick = () => {
    setNoClickCount(prev => prev + 1);
  };

  const handleYesClick = () => {
    setShowCelebration(true);
    setTimeout(() => {
      setShowSuccess(true);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <>
        <CelebrationEffects isActive={true} />
        <Stack
          spacing={4}
          alignItems="center"
          justifyContent="center"
          sx={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #FFE0E6 0%, #E8F5E8 100%)',
            padding: 3,
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}
        >
          <CharacterDisplay isHappy={true} />
          <Typography
            variant="h4"
            sx={{
              color: '#FF6B6B',
              fontWeight: 600,
              maxWidth: '600px',
              animation: 'rainbowText 3s ease-in-out infinite, bounce 2s infinite',
              textShadow: '0 0 20px rgba(255, 107, 107, 0.5)'
            }}
          >
            🎉 YAŞASIN! 🎉
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: '#FF6B6B',
              fontWeight: 500,
              maxWidth: '600px',
              animation: 'slideInUp 1s ease-out'
            }}
          >
            Her sabah güzel mesajların için çok teşekkür ederim! 💕
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#666',
              maxWidth: '500px',
              animation: 'fadeInScale 2s ease-out'
            }}
          >
            Sen gerçekten çok özelsin! ✨🌟💖
          </Typography>
          <style>
            {`
              @keyframes rainbowText {
                0% { color: #FF6B6B; }
                16% { color: #FF8E53; }
                33% { color: #FF6B9D; }
                50% { color: #C44569; }
                66% { color: #F8B500; }
                83% { color: #FF6B6B; }
                100% { color: #FF6B6B; }
              }
              
              @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                  transform: translateY(0);
                }
                40% {
                  transform: translateY(-10px);
                }
                60% {
                  transform: translateY(-5px);
                }
              }
              
              @keyframes slideInUp {
                from {
                  transform: translateY(50px);
                  opacity: 0;
                }
                to {
                  transform: translateY(0);
                  opacity: 1;
                }
              }
              
              @keyframes fadeInScale {
                from {
                  transform: scale(0.5);
                  opacity: 0;
                }
                to {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            `}
          </style>
        </Stack>
      </>
    );
  }

  return (
    <>
      <CelebrationEffects isActive={showCelebration && !showSuccess} />
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #E3F2FD 0%, #F3E5F5 100%)',
          padding: 3,
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <CharacterDisplay isHappy={false} />
        
        <Typography
          variant="h4"
          sx={{
            color: '#FF6B6B',
            fontWeight: 600,
            maxWidth: '600px',
            lineHeight: 1.4,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            animation: noClickCount > 3 ? 'shake 0.5s ease-in-out infinite' : 'none'
          }}
        >
          Bana Her Sabah Günaydın Mesajı Atar Mısın? 🌅
        </Typography>

        <Box sx={{ position: 'relative', width: '100%', height: '200px' }}>
          <GrowingButton
            variant="contained"
            color="primary"
            onClick={handleYesClick}
            growthLevel={noClickCount}
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
              '&:hover': {
                boxShadow: '0 6px 16px rgba(76, 175, 80, 0.4)',
                transform: `translate(-50%, -50%) scale(${1.05 + noClickCount * 0.1})`
              }
            }}
          >
            Evet! 💕
          </GrowingButton>

          <MovingNoButton onClick={handleNoClick} clickCount={noClickCount} />
        </Box>

        {noClickCount > 2 && (
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              fontStyle: 'italic',
              animation: 'fadeIn 0.5s ease-in'
            }}
          >
            Lütfen? 🥺
          </Typography>
        )}

        {noClickCount > 5 && (
          <Typography
            variant="body1"
            sx={{
              color: '#FF6B6B',
              fontWeight: 500,
              animation: 'pulse 1s infinite'
            }}
          >
            Sadece güzel bir mesaj... 💌
          </Typography>
        )}

        {noClickCount > 8 && (
          <Typography
            variant="h6"
            sx={{
              color: '#FF6B6B',
              fontWeight: 600,
              animation: 'bounce 1s infinite',
              textShadow: '0 0 10px rgba(255, 107, 107, 0.5)'
            }}
          >
            LÜTFEN LÜTFEN LÜTFEN! 😭💔
          </Typography>
        )}

        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
            
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              25% { transform: translateX(-5px); }
              75% { transform: translateX(5px); }
            }
            
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-10px); }
              60% { transform: translateY(-5px); }
            }
          `}
        </style>
      </Stack>
    </>
  );
};

export default InteractiveQuestion;