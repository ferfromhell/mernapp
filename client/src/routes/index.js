import React from 'react';
import { BrowserRouter as Router, Route, Link ,Switch} from 'react-router-dom';

const Home = ()=> <h1>Home</h1>;
const Login = ()=> <h1>Login</h1>
const Register = ()=> <h1>Register</h1>


export default () => {
    <Router>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
        </Switch>
    </Router>
}