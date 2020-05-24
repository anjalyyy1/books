import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'styled-components';
import configureTheme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={configureTheme()}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
