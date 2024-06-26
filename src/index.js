import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#597445', // E7F0DC
    },
    secondary: {
      main: '#729762', // 597445
    },
    background: {
      default: '#E7F0DC', // Light background color
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
