import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

// components
import HomePage from 'pages/home';
import Books from 'pages/books';
import Authors from 'pages/authors';

const routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={HomePage} />
        <Route path='/books' exact component={Books} />
        <Route path='/authors' exact component={Authors} />
      </Switch>
    </BrowserRouter>
  );
};

export default routes;
