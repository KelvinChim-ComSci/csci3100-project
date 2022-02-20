import React from "react";
import './App.css';
import Login from "./frontend/Login.js";
import ForgetPassword from "./frontend/ForgetPassword.js";
import Main from "./frontend/Main.js";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      accessLevel: "",
      loggedInStatus: "NotLoggedIn",
      forgetPassword: false
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }


  componentDidMount() {
    console.log(window.localStorage.getItem("username") + " username");
    console.log(window.localStorage.getItem("loggedInStatus") + " logged in status");
  }

  handleLogin() {
    this.setState({
      username: this.getUsername(),
      accessLevel: this.getAccessLevel(),
      loggedInStatus: "loggedIn"
    });
  }

  handleLogout() {
    this.setState({
      username: "",
      accessLevel: "",
      loggedInStatus: "NotLoggedIn",
      forgetPassword: false
    });
  }

  getUsername() {
    const placeholder = "placeholder";
    return placeholder;
  }

  getAccessLevel() {
    const placeholder = "placeholder";
    return placeholder;
  }




  render() {
      return (
        <div className="App" >
          <Router>
            <Routes>
              <Route 
                exact path="/" 
                element={<Login />} 
              />
              <Route path = "/login">
                <Login
                  handleLogin = {this.handleLogin}
                  handleLogout = {this.handleLogout}
                  username = {this.state.username}
                  accessLevel = {this.state.accessLevel}
                  loggedInStatus = {this.state.loggedInStatus} // not yet working
                />
              </Route>
              {/*<Route path="/forgetPassword" element={<ForgetPassword />} />
              <Route path="/main" element={<Main />} />*/}
          </Routes>

            {/*
            <Link style= {{padding: 5}} to={"/login"}>Log in</Link>
            <Link style= {{padding: 5}} to={"/forgetPassword"}>Forget Password</Link>
            <Link style= {{padding: 5}} to={"/main"}> Main </Link> 
            */}
          </Router>
        </div>
      );
  }
}

export default App;
