
import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ThemeProvider, Switch as MaterialSwitch } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import { dark } from '../theme.js';

import Main from './Main';
import Navbar from './Navbar';
import User from './User';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#222326",
  },
}));

export default function App(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className="Navbar">
        <ThemeProvider theme={dark}>
          <Router>
            <Navbar></Navbar>
            <MaterialSwitch>
            </MaterialSwitch>
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

const appDiv = document.getElementById("app");
render(<App />, appDiv);