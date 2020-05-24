import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'styled-components';
import configureTheme from './theme';

ReactDOM.render(
  <>
    <ThemeProvider theme={configureTheme()}>
      <App />
    </ThemeProvider>
  </>,
  document.getElementById('root')
);
