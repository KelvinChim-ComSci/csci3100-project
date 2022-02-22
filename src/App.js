import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import Login from "./frontend/Login.js";
import ForgetPassword from "./frontend/ForgetPassword.js";
import Main from "./frontend/Main.js";
import Registration from "./frontend/Registration";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
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
    console.log("logged in status: " + this.state.loggedInStatus);
    console.log(this.state.isLoggedIn)
  }

  handleLogin(user, checkAdmin) {
    this.setState({
      username: user,
      isAdmin: checkAdmin,
      loggedInStatus: "Logged in",
      isLoggedIn: 1
    });
    console.log("username: " + this.state.username + "\nis administrator: " + this.state.isAdmin + "\nlogged in status: " + this.state.loggedInStatus);
  }

  handleLogout() {
    this.setState({
      username: "",
      accessLevel: "",
      loggedInStatus: "Not Logged in",
      isLoggedIn: 0,
      forgetPassword: false
    });
  }

  render() {
    return (
      <div className="App" >
        <Router>
          <Routes>
            <Route
              exact path="/"
              element={this.state.isLoggedIn ? <Main /> :
                <Login
                  handleLogin={this.handleLogin}
                />
              }
            />
            <Route path="/main"
              element={<Main />}
            />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
              <Route path="/main" element={<Main />} />
          </Routes>

          
            <Link style= {{padding: 5}} to={"/login"}>Log in</Link>
            <Link style= {{padding: 5}} to={"/forgetPassword"}>Forget Password</Link>
            <Link style= {{padding: 5}} to={"/main"}> Main </Link> 
           
        </Router>
      </div>
    );
  }
}

export default App;
