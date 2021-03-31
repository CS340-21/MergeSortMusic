import './App.css';
import Main from './Components/Main';
import Navbar from './Components/Navbar';
import User from './Components/User';
import { ThemeProvider } from '@material-ui/core';
import { Switch as MaterialSwitch } from '@material-ui/core';
import { dark } from './theme.js.js';


import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const App = (props) => {

  return (
    <div>
      <div className="Navbar">
        <ThemeProvider theme={dark}>
          <Router>
            <Navbar></Navbar>
            <MaterialSwitch>
            </MaterialSwitch>
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/user" component={User} />
            </Switch>
          </Router>
        </ThemeProvider>
      </div>
    </div>
  );
};

export default App;