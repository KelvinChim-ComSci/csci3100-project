import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from "./frontend/SignInPage/Login.js";
import ForgotPassword from "./frontend/SignInPage/ForgotPassword.js";
import Main from "./frontend/Main.js";
import Registration from "./frontend/SignInPage/Registration.js";
import Event from "./frontend/Event.js";
import EmailVerified from "./frontend/SignInPage/EmailVerified.js";
import AdminPage from "./frontend/AdminPage";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      userId: "",
      isAdmin: 0,
      loggedInStatus: "Not Logged In",
      isLoggedIn: 0,
      forgetPassword: false,
      location: "",
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSessionRefresh = this.handleSessionRefresh.bind(this);
  }


  componentDidMount() {
    console.log("username: " + this.state.username);
    console.log("userID: " + this.state.userId);
    console.log("logged in status: " + this.state.loggedInStatus);
    console.log(this.state.isLoggedIn);
  }
  
  handleSessionRefresh() {
    this.setState({
      username: window.sessionStorage.getItem("username"),
      userId: window.sessionStorage.getItem("userId"),
      isAdmin: window.sessionStorage.getItem("isAdmin"),
      loggedInStatus: window.sessionStorage.getItem("loggedInStatus"),
      isLoggedIn: window.sessionStorage.getItem("isLoggedIn")
    });
  }

  handleLogin(user, userId, checkAdmin) {
    this.setState({
      username: user,
      userId: userId,
      isAdmin: checkAdmin,
      loggedInStatus: "Logged in",
      isLoggedIn: 1
  });
    window.sessionStorage.setItem("username", user);
    window.sessionStorage.setItem("userId", userId);
    window.sessionStorage.setItem("isAdmin", checkAdmin);
    window.sessionStorage.setItem("loggedInStatus", "Logged in");
    window.sessionStorage.setItem("isLoggedIn", 1);

    console.log("username: " + this.state.username + "\nUser ID: " + this.state.userId + "\nis administrator: " + this.state.isAdmin + "\nlogged in status: " + this.state.loggedInStatus);
  }

  handleLogout() {
    this.setState({
      username: "",
      isAdmin: 0,
      loggedInStatus: "Not Logged in",
      isLoggedIn: 0,
      forgetPassword: false
    });
    window.sessionStorage.removeItem("username");
    window.sessionStorage.removeItem("userId");
    window.sessionStorage.removeItem("isAdmin");
    window.sessionStorage.removeItem("loggedInStatus");
    window.sessionStorage.removeItem("isLoggedIn");
  }

  handleLocation(location){
    this.setState({location: location});
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
            <Route path="/email/confirm/:id" element={<EmailVerified />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route
              path="/main"
              element={
                <Main
                  handleSessionRefresh={this.handleSessionRefresh}
                  handleLogout={this.handleLogout}
                  handleLocation = {this.handleLocation}
                  location = {this.state.location}
                  username={this.state.username}
                  userId={this.state.userId}
                />
              }
            />
            <Route path="/event" element={<Event
            location = {this.state.location}/>} />
            <Route 
              path="/adminPage" 
                element={<AdminPage
                  handleLogout={this.handleLogout}
                  username={this.state.username}
                  userId={this.state.userId}
                />
              } 
            />
          </Routes >


          <Link style={{ padding: 5 }} to={"/"}>Log in</Link>
          <Link style={{ padding: 5 }} to={"/registration"}>Registration</Link>
          <Link style={{ padding: 5 }} to={"/forgotPassword"}>Forgot Password</Link>
          <Link style={{ padding: 5 }} to={"/main"}> Main </Link>
          <Link style={{ padding: 5 }} to={"/event"}> Event </Link>


        </Router >
      </div >
    );
  }
}

export default App;
