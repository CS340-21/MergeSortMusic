
import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ThemeProvider } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { dark } from '../theme.js';

import Main from './Main';
import Navbar from './Navbar';
import User from './User';

const useStyles = makeStyles((theme) => ({

}));

export default function App(props) {
  const classes = useStyles();

  return (
    <div>
      <div className="Navbar">
        <ThemeProvider theme={dark}>
          <Router>
            <Navbar></Navbar>
            <Switch>
              <Route path="/user" component={User} />
              <Route path="/">
                <Main />
              </Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </div>
    </div>
  );
};
