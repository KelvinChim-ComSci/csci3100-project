import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./frontend/SignInPage/Login.js";
import ForgotPassword from "./frontend/SignInPage/ForgotPassword.js";
import Main from "./frontend/Main.js";
import Registration from "./frontend/SignInPage/Registration.js";
import EmailVerified from "./frontend/SignInPage/EmailVerified.js";
import ChangePassword from "./frontend/SignInPage/ChangePassword.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      username: "",
      userId: "",
      isAdmin: 0,
      loggedInStatus: "Not Logged In",
      isLoggedIn: 0,
      forgetPassword: false,
      location: "",
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleDisplayName = this.handleDisplayName.bind(this);
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
      displayName: window.sessionStorage.getItem("displayName"),
      username: window.sessionStorage.getItem("username"),
      userId: window.sessionStorage.getItem("userId"),
      isAdmin: window.sessionStorage.getItem("isAdmin"),
      loggedInStatus: window.sessionStorage.getItem("loggedInStatus"),
      isLoggedIn: window.sessionStorage.getItem("isLoggedIn")
    });
  }

  handleLogin(displayName, user, userId, checkAdmin) {
    this.setState({
      displayName: displayName,
      username: user,
      userId: userId,
      isAdmin: checkAdmin,
      loggedInStatus: "Logged in",
      isLoggedIn: 1
    });
    window.sessionStorage.setItem("displayName", displayName);
    window.sessionStorage.setItem("username", user);
    window.sessionStorage.setItem("userId", userId);
    window.sessionStorage.setItem("isAdmin", checkAdmin);
    window.sessionStorage.setItem("loggedInStatus", "Logged in");
    window.sessionStorage.setItem("isLoggedIn", 1);

    console.log("username: " + this.state.username + "\nUser ID: " + this.state.userId + "\nis administrator: " + this.state.isAdmin + "\nlogged in status: " + this.state.loggedInStatus);
  }

  handleDisplayName(newDisplayName) {
    this.setState({
      displayName: newDisplayName
    });
    window.sessionStorage.setItem("displayName", newDisplayName);
  }
  handleLogout() {
    this.setState({
      displayName: "",
      username: "",
      isAdmin: 0,
      loggedInStatus: "Not Logged in",
      isLoggedIn: 0,
      forgetPassword: false
    });
    window.sessionStorage.removeItem("displayName");
    window.sessionStorage.removeItem("username");
    window.sessionStorage.removeItem("userId");
    window.sessionStorage.removeItem("isAdmin");
    window.sessionStorage.removeItem("loggedInStatus");
    window.sessionStorage.removeItem("isLoggedIn");
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
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/changepassword/:id" element={<ChangePassword />} />
            <Route
              path="/main"
              element={
                <Main
                  handleSessionRefresh={this.handleSessionRefresh}
                  handleLogout={this.handleLogout}
                  handleLocation={this.handleLocation}
                  handleDisplayName={this.handleDisplayName}
                  location={this.state.location}
                  displayName={this.state.displayName}
                  username={this.state.username}
                  userId={this.state.userId}
                />
              }
            />
          </Routes >

          {/*<Link to="/email/confirm/:id">Email Verified</Link>*/}

        </Router >
      </div >
    );
  }
}

export default App;
