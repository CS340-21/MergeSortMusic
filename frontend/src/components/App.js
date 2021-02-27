import React, { Component } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Info from "./Info";
import { render } from "react-dom";
import HomePage from "./HomePage";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="center">
        <Router>
          <Switch>
            <Route path="/join" component={RoomJoinPage} />
            <Route path="/info" component={Info} />
            <Route path="/create" component={CreateRoomPage} />
            <Route path="/room/:roomCode" component={Room} />
            <Route path="/" component={HomePage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
