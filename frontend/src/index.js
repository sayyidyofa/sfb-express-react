import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/front/Landing";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/SignUp";
import UserHome from "./pages/dashboard/UserHome";
import Logout from "./pages/auth/Logout";
import AdminHome from "./pages/dashboard/AdminHome";
import PostCreate from "./pages/resource/post/PostCreate";
import ShowPost from "./pages/front/ShowPost";
import PostEdit from "./pages/resource/post/PostEdit";
import Error404 from "./pages/error/404";
import UserCreate from "./pages/resource/user/UserCreate";
import UserEdit from "./pages/resource/user/UserEdit";

ReactDOM.render(
  <Router>
    <div>
        <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout}/>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/home/user" component={UserHome}/>
            <Route exact path="/post/new" component={PostCreate}/>
            <Route exact path="/post/:id" component={ShowPost}/>
            <Route exact path="/post/:id/edit" component={PostEdit}/>
            <Route exact path="/home/admin" component={AdminHome}/>
            <Route exact path="/user/new" component={UserCreate}/>
            <Route exact path="/user/:id/edit" component={UserEdit}/>
            <Route component={Error404}/>
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
