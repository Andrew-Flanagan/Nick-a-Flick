import { createTheme } from '@mui/material/styles/index.js';

const theme = createTheme({
    palette: {
        primary: {
          main: '#0e3fa9', // Nav Bar Blue
          secondary: '#0C2862', // Darker, Text Blue
        },
        secondary: {
          main: '#FFC436', // Background Yellow
        },
        error: {
          main: '#f44336', // Red
        },
        text: {
          primary: '#000', // Black
          secondary: '#555', // Gray
        },
        background: {
          default: '#FFC436', // White background
          paper: '#f7f7f7', // Light gray for elements
        },
      },
      
    typography: {
        button: {
          textTransform: 'none',
        },
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: 14,
      body: {
        color: '#0C2862',
      },
      h1: {
        color: '#0C2862'
      },
      h2: {
        color: '#0C2862'
      },
      h3: {
        color: '#0C2862'
      },
      h4: {
        color: '#0C2862'
      },
      h5: {
        color: '#0C2862'
      },
      h6: {
        color: '#0C2862'
      },
    },

    components: {
      MuiButton: {
        defaultProps: {
          color: 'primary', // Default button color is set to primary
        },
        styleOverrides: {
          root: {
            fontWeight: 'bold',
            borderRadius: '8px', // Set default button border radius
          },
          containedSecondary: {
            backgroundColor: '#FFC436', // Secondary button background color
            color: '#0e3fa9', // Text color for the secondary button
            '&:hover': {
              backgroundColor: '#FFD766', // Darker shade on hover e6b02d
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            color: "#0C2862",
            "&:before, &:after": {
              borderBottom: "0 !important",
              paddingRight: "0px !important",
              textAlign: "left",
            },
          },
        },
      },
    },
  

  });
  
  export default theme;
  