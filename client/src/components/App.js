import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import MyApps from './MyApplications.js'
import Register from './Register.js'
import Login from './Login.js';
import AppForm from './AppForm.js'
import { Button } from '@material-ui/core';
import history from '../context/history.js'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  logout = (event) => {
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
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
              <li>
                <Link to="/appForm">Add an Application</Link>
              </li>
              <li>
                <Link to="/login" onClick = {this.logout}>Log Out</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path = "/register" component = {Register} />
            <Route path = "/login" component = {Login} />
            <Route path = "/apps" component = {MyApps} />
            <Route path = "/appForm" component = {AppForm} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
