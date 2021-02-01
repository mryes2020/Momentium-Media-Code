import React from "react"; 
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom';

// import my components
import NavigationBar from "./navigation-bar"; 
import LoginForm from "./login"; 
import RegisterForm from "./register"; 
import MainPage from "./main-page"; 
import AboutPage from "./about"; 



function MainApplication() {
  return (
    <div className="home-container">
      <NavigationBar/>
      <Router>
        <Switch>
          <Route exact path={[
              "/", 
              "/login", 
              "/index"
          ]} component = {LoginForm}/>
          <Route exact path="/register" component = {RegisterForm}/>
          <Route exact path="/main-page" component = {MainPage}/>
          <Route exact path="/about" component = {AboutPage}/>
        </Switch>
      </Router>
    </div>
  );
}

export default MainApplication;
