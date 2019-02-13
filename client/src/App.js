import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Switch} from 'react-router-dom';

// import logo from './logo.svg';
import './App.css';


import Login from "./components/Login";
import Home from "./components/Home";
import { PrivateRoute } from './components/PrivateRoute';




class App extends Component {
  render() {
    return (
      <Router>
          <Switch>
            <PrivateRoute path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            {/* <Route path="/landing" component={Register} /> */}
          </Switch>
      </Router>
    );
  }
}

export default App;
