import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'styled-components';
import configureTheme from './theme';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: process.env.REACT_APP_BASE_URL
});

ReactDOM.render(
  <>
    <ApolloProvider client={client}>
      <ThemeProvider theme={configureTheme()}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </>,
  document.getElementById('root')
);
