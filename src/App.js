import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Login from "./frontend/Login.js";
import ForgotPassword from "./frontend/ForgotPassword.js";
import Main from "./frontend/Main.js";
import Registration from "./frontend/Registration";
import Event from "./frontend/Event";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      userId: "",
      isAdmin: 0,
      loggedInStatus: "Not Logged In",
      isLoggedIn: 0,
      forgetPassword: false
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }


  componentDidMount() {
    console.log("username: " + this.state.username);
    console.log("userID: " + this.state.userId);
    console.log("logged in status: " + this.state.loggedInStatus);
    console.log(this.state.isLoggedIn);
  }

  handleLogin(user, userId, checkAdmin) {
    this.setState({
      username: user,
      userId: userId,
      isAdmin: checkAdmin,
      loggedInStatus: "Logged in",
      isLoggedIn: 1
    });
    console.log("username: " + this.state.username + "\nUser ID: " + this.state.userId + "\nis administrator: " + this.state.isAdmin + "\nlogged in status: " + this.state.loggedInStatus);
  }

  handleLogout() {
    this.state.username = "";
    this.state.isAdmin = 0;
    this.state.loggedInStatus = "Not Logged in";
    this.state.isLoggedIn = 0;
    this.state.forgetPassword = false;
  }

  render() {
    return (
      <div className="App" >
        <Router>
          <Routes>
            <Route
              exact path="/"
              element={
                <Login
                  handleLogin={this.handleLogin}
                />
              }
            />

            <Route path="/registration" element={<Registration />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route 
            path="/main" 
            element={
            <Main 
              handleLogout={this.handleLogout}
              username={this.state.username}
              userId={this.state.userId}
                />
              } 
            />
              <Route path="/event" element={<Event/>} />

          </Routes>

          
            <Link style= {{padding: 5}} to={"/"}>Log in</Link>
            <Link style= {{padding: 5}} to={"/registration"}>Registration</Link>
            <Link style= {{padding: 5}} to={"/forgotPassword"}>Forgot Password</Link>
            <Link style= {{padding: 5}} to={"/main"}> Main </Link> 
            <Link style= {{padding: 5}} to={"/event"}> Event </Link> 

           
        </Router>
      </div>
    );
  }
}

export default App;
