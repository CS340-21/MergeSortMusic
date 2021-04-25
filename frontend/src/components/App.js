import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import { ThemeProvider } from '@material-ui/core';
import { dark } from '../theme.js';

import Main from './Main';
import Navbar from './Navbar';
import User from './User';

export default function App() {
  const [userPlaylist, setUserPlaylist] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setSignIn] = useState(false)
  useEffect(() => {
    console.log("changed playlist");
  }, [userPlaylist]);

  return (
    <div>
      <div className="Navbar">
        <ThemeProvider theme={dark}>
          <Router>
            <Navbar userPLaylist={userPlaylist} setUserPlaylist={setUserPlaylist} username={username} password={password} setUsername={setUsername} setPassword={setPassword} isSignedIn={isSignedIn} setSignIn={setSignIn}></Navbar>
            <Switch>
              <Route path="/user" component={() => {return <User userPlaylist={userPlaylist} setUserPlaylist={setUserPlaylist} username={username} password={password} setUsername={setUsername} setPassword={setPassword} isSignedIn={isSignedIn} setSignIn={setSignIn}/>}} />
              <Route path="/" component={() => {return <Main userPLaylist={userPlaylist} setUserPlaylist={setUserPlaylist} username={username} password={password} setUsername={setUsername} setPassword={setPassword} isSignedIn={isSignedIn} setSignIn={setSignIn}/>}}></Route>
            </Switch>
          </Router>
        </ThemeProvider>
      </div>
    </div>
  );
};
