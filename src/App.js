import logo from './logo.svg';
import React from "react";
import './App.css';
import Login from "./frontend/Login.js";
import ForgetPassword from "./frontend/ForgetPassword.js";
import Main from "./frontend/Main.js";

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
class App extends React.Component {
  /*constructor(props) {
    super(props);
    this.state = {
      forgetPassword: false
    }
  }*/

  render() {
    return (
      <div className="App" >
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <br></br>
        CU Simulator
        <br></br>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/main" element={<Main />} />
          </Routes>
          <Link to={"/forgetPassword"}>Forget Password</Link>
          <Link style= {{padding: 5}} to={"/main"}> Main </Link>
        </Router>
      </div >
    );
  }
}

export default App;
