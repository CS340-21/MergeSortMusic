import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { ThemeProvider } from '@material-ui/core';
import { dark } from '../theme.js';

import Main from './Main';
import Navbar from './Navbar';
import User from './User';

export default function App() {

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
