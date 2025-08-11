import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50',
      light: '#81C784',
      dark: '#388E3C',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#FF5722',
      light: '#FF8A65',
      dark: '#D84315',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#E3F2FD',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#FF6B6B',
      secondary: '#666666'
    }
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.4
    }
  },
  shape: {
    borderRadius: 12
  }
});

export default theme;