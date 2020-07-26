import React, { useState } from 'react';
import logo from '../logo.svg';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import MyApps from './MyApplications.js'
import Register from './Register.js'
import Login from './Login';
import { AuthContext } from '../context/auth';
import PrivateRoute from '../PrivateRoute';

class App extends React.Component {

  authTokens = null;
  setAuthTokens = null;

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/apps">My Applications</Link>
              </li>
              <li>
                <Link to="/register">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Log In</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path = "/register" component = {Register} />
            <Route path = "/login" component = {Login} />
            <Route path = "/apps" component = {MyApps} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
