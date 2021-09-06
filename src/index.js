import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App/app';
import { createTheme, ThemeProvider } from "@material-ui/core/styles"


const theme = createTheme({
  palette: {
    primary: {
      light: '#4b6379',
      main: '#1E3D58',
      dark: '#152a3d',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ecf1f3',
      main: '#E8EEF1',
      dark: '#a2a6a8',
      contrastText: '#000',
    },
  },
});

ReactDOM.render(
  <Router>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);