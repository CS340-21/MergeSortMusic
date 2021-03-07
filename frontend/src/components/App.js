import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Home, Menu, Inbox, Mail } from "@material-ui/icons";

import RoomJoinPage from "./RoomJoinPage";
import Info from "./Info";
import Playlists from "./Playlists";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import HomePage from "./HomePage";

const useStyles = makeStyles((theme) => ({
  gradient: {
    width: "100%",
    height: "100%",
    padding: "0px",
    margin: "0px",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  spotifyButton: {
    backgroundColor: "#1DB954",
    opacity: "1",
  },
  spotifyDisabled: {
    backgroundColor: "#1DB954",
    opacity: "0.4",
  },
}));

export default function App(props) {
  const classes = useStyles();
  const [state, setState] = useState({ left: false });
  const [spotifyAuthenticated, setSpotifyAuthenticated] = useState(true);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ [anchor]: open });
  };

  const authenticateSpotify = () => {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status);
        console.log(data.status);
        if (!data.status) {
          fetch("/spotify/get-auth-url")
            .then((response) => response.json())
            .then((data) => {
              window.location.replace(data.url);
            });
        }
      });
  };

  const checkAuthentication = () => {
    fetch("/spotify/is-authenticated")
      .then((response) => response.json())
      .then((data) => {
        setSpotifyAuthenticated(data.status);
        console.log(data.status);
      });
  };

  const list = (anchor) => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button key={"Playlists"} to="/playlists" component={Link}>
          <ListItemIcon>
            <Inbox />
          </ListItemIcon>
          <ListItemText primary={"Playlists"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button key={"Info"} to="/info" component={Link}>
          <ListItemIcon>
            <Mail />
          </ListItemIcon>
          <ListItemText primary={"Info"} />
        </ListItem>
      </List>
    </div>
  );

  useEffect(() => {
    console.log("ran");
    checkAuthentication();
    const interval = setInterval(() => {checkAuthentication()}, 300000);
    return () => {
      console.log("cleanup");
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={classes.gradient}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={toggleDrawer("left", true)}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
            <Typography
              color="inherit"
              variant="h6"
              to="/"
              component={Link}
              aria-label="home"
              className={classes.title}
            >
              Merge Sort Music
            </Typography>
            <Button
              color="inherit"
              className={classes.spotifyButton}
              disabled={spotifyAuthenticated}
              variant="contained"
              onClick={() => {
                authenticateSpotify();
              }}
            >
              {spotifyAuthenticated ? "Authenticated" : "Authenticate with Spotify"}
            </Button>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>

        <Switch>
          <Route path="/join" component={RoomJoinPage} />
          <Route path="/info" component={Info} />
          <Route path="/playlists" component={Playlists} />
          <Route path="/create" component={CreateRoomPage} />
          <Route path="/room/:roomCode" component={Room} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </div>
  );
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
