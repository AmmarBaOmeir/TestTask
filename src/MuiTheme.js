import { createTheme } from '@mui/material/styles';

// palette is used to define the color scheme of the application
// primary is the main color of the application
// secondary is the secondary color of the application
// typography is used to define the font family of the application
// fontFamily is the font family of the application

const MuiTheme = createTheme({
  palette: {
    // Green
    primary: {
      main: '#608A51',
      contrastText: '#F7FDF5',
    },
    // Black
    secondary: {
      main: '#161616',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF', // white
      paper: '#F7F7F7', // light grey
      lightGreen: '#F7FDF5',
      darkGreen: '#608A51',
    },
    border: {
      default: '#C3C2C2', // grey
      darkGreen: '#608A51',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default MuiTheme;
