import React from "react";
import './App.css';

import { BrowserRouter as Router, 
  Route, 
  Switch,  
  Redirect 
} from "react-router-dom";

import {ProtectedRoute} from './ProtectedRoute';


//Pages
import HomePage from "./Pages/HomePage";
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import DashboardPage from "./Pages/DashboardPage.js";

function App() {

 
  
  return (
    <div> 
      <Router> 
          <Switch> 
            <Route exact path="/" component={HomePage} />
            <Route exact path="/user/login" component={Login} />
            <Route exact path="/user/register" component={Register} />
            <ProtectedRoute exact path="/dashboard" component={DashboardPage} />
            <Redirect to="/"/>
          </Switch>
      </Router>

    </div>
  );
}

export default App;
