import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from "./pages/front/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";
import UserHome from "./pages/dashboard/UserHome";
import Logout from "./pages/auth/Logout";
import AdminHome from "./pages/dashboard/AdminHome";

ReactDOM.render(
  <Router>
    <div>
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout}/>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/home/user" component={UserHome}/>
            <Route exact path="/home/admin" component={AdminHome}/>
            {/*<Route exact path="" component={}/>*/}
        </Switch>
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
