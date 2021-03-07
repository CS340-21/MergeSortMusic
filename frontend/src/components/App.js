import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
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
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

export default function App(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ [anchor]: open });
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

  return (
    <div className={classes.gradient}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              onClick={toggleDrawer("left", true)}
              edge="start"
              aria-label="menu"
            >
              <Menu />
            </IconButton>
            <IconButton
              edge="start"
              color="inherit"
              to="/"
              component={Link}
              aria-label="home"
            >
              <Home fontSize="large" />
            </IconButton>
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
