import React from 'react';
import logo from '../logo.svg';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import ClassComponent from './ClassComponent.js'
import Register from './Register.js'
import Login from './Login';
import { AuthContext } from '../context/auth';
import PrivateRoute from '../PrivateRoute';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {name: props.name}
  }

  render() {
    return (
      <AuthContext.Provider value = {false}>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/class">Class</Link>
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
              <Route path = "/register">
                <Register />
              </Route>
              <Route path = "/login">
                <Login />
              </Route>
              <PrivateRoute path = "/class">
                <ClassComponent />
              </PrivateRoute>
            </Switch>
          </div>
        </Router>
      </AuthContext.Provider>
    );
  }
}

export default App;
