/**************************************************************************************** 
This component is activated when the system is required to navigate to different URL 
which links to different react component. It also provides function for setting state
and getting some window session storage.

Last updated: 5/5/2022 by Wong Yi Oi
****************************************************************************************/

import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./frontend/SignInPage/Login.js";
import ForgotPassword from "./frontend/SignInPage/ForgotPassword.js";
import Main from "./frontend/Main.js";
import Registration from "./frontend/SignInPage/Registration.js";
import EmailVerified from "./frontend/SignInPage/EmailVerified.js";
import ChangePassword from "./frontend/SignInPage/ChangePassword.js";
import InvalidURL from "./frontend/InvalidURL";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      username: "",
      aboutMe: "",
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
    this.handleAboutMe = this.handleAboutMe.bind(this);
    this.handleSessionRefresh = this.handleSessionRefresh.bind(this);
  }

  //handle the login status of the user when refreshing
  handleSessionRefresh() {
    this.setState({
      displayName: window.sessionStorage.getItem("displayName"),
      username: window.sessionStorage.getItem("username"),
      aboutMe: window.sessionStorage.getItem("aboutMe"),
      userId: window.sessionStorage.getItem("userId"),
      isAdmin: window.sessionStorage.getItem("isAdmin"),
      loggedInStatus: window.sessionStorage.getItem("loggedInStatus"),
      isLoggedIn: window.sessionStorage.getItem("isLoggedIn")
    });
  }

  //handle the login status of the user
  handleLogin(displayName, user, userId, checkAdmin, aboutMe) {
    this.setState({
      displayName: displayName,
      username: user,
      aboutMe: aboutMe,
      userId: userId,
      isAdmin: checkAdmin,
      loggedInStatus: "Logged in",
      isLoggedIn: 1
    });
    window.sessionStorage.setItem("displayName", displayName);
    window.sessionStorage.setItem("username", user);
    window.sessionStorage.setItem("aboutMe", aboutMe);
    window.sessionStorage.setItem("userId", userId);
    window.sessionStorage.setItem("isAdmin", checkAdmin);
    window.sessionStorage.setItem("loggedInStatus", "Logged in");
    window.sessionStorage.setItem("isLoggedIn", 1);
  }

  //get the displayname of the user
  handleDisplayName(newDisplayName) {
    this.setState({
      displayName: newDisplayName
    });
    window.sessionStorage.setItem("displayName", newDisplayName);
  }

  //get the about me of the user
  handleAboutMe(newDescription) {
    this.setState({
      aboutMe: newDescription
    });
    window.sessionStorage.setItem("aboutMe", newDescription);
  }

  //handle the logout status of the user
  handleLogout() {
    this.setState({
      displayName: "",
      username: "",
      aboutMe: "",
      isAdmin: 0,
      loggedInStatus: "Not Logged in",
      isLoggedIn: 0,
      forgetPassword: false
    });
    window.sessionStorage.removeItem("displayName");
    window.sessionStorage.removeItem("username");
    window.sessionStorage.removeItem("aboutMe");
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
            <Route path="/changepassword/:id" element={<ChangePassword loginPage={true}/>} />
            <Route
              path="/main"
              element={ (this.state.loggedInStatus === "Logged in" || window.sessionStorage.getItem("loggedInStatus") === "Logged in") ? 
                <Main
                  handleSessionRefresh={this.handleSessionRefresh}
                  handleLogout={this.handleLogout}
                  handleLocation={this.handleLocation}
                  handleDisplayName={this.handleDisplayName}
                  handleAboutMe={this.handleAboutMe}
                  location={this.state.location}
                  displayName={this.state.displayName}
                  username={this.state.username}
                  aboutMe={this.state.aboutMe}
                  userId={this.state.userId}
                /> : <Navigate to="/" replace />
              }
            />
            <Route path="*" element={<InvalidURL />} />
          </Routes >
        </Router >
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
      </div >
    );
  }
}

export default App;
