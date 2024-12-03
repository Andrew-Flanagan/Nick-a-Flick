import { createTheme } from '@mui/material/styles/index.js';

const theme = createTheme({
    palette: {
        primary: {
          main: '#1976d2', // Blue
        },
        secondary: {
          main: '#FEE440', // Yellow
        },
        error: {
          main: '#f44336', // Red
        },
        text: {
          primary: '#000', // Black
          secondary: '#555', // Gray
        },
        background: {
          default: '#fff', // White background
          paper: '#f7f7f7', // Light gray for elements
        },
      },
      
    typography: {
        button: {
          textTransform: 'none',
        },
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14,
    },

  });
  
  export default theme;
  