import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';
/*
import ForgetPassword from "./ForgetPassword.js";
import Main from "./Main.js";
import Registration from "./Registration.js";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
*/

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.userLogin = this.userLogin.bind(this);
    }


    async userLogin(event) {
        event.preventDefault();
        let inputUsername = document.getElementsByName("username")[0].value;
        let inputPassword = document.getElementsByName("password")[0].value;

        if (this.isEmpty(inputUsername)) {
            return console.log("Please enter a username."); // subject to change
        }
        else if (this.isEmpty(inputPassword)) {
            return console.log("Please enter a password."); // subject to change
        }

        await fetch(process.env.REACT_APP_BASE_URL + "/login", {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": true,
            }),
            body: JSON.stringify({
                username: inputUsername,
                password: inputPassword
            }),
        })
        .then((res) => res.json())
        .then((res) => {
            if (this.isLoginValid(res.errorMsg)) {
                this.props.handleLogin(res.username, res.accessLevel);
            }
            else {
                console.log(res.errorMsg);
            }
        });
    }


    async send_request() {
        await fetch(process.env.REACT_APP_BASE_URL + "/test", {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": true,
            }),
        }
        )
            .then((res) => res.json())
            .then((res) => {
                console.log("hi\n");
                console.log(res);
                //const parsedData = res.text();
                //console.log(parsedData);

                const detailsElement = document.getElementById("test");
                detailsElement.getElementsByTagName("h3")[0].innerText = res.name;
                //detailsElement.getElementsByTagName("p")[0].innerText = data.name;
            })
    }

    isLoginValid(errorMessage) {
        if (errorMessage === "none") {
            return 1;
        }
        else return 0;
    }

    isEmpty(input) {
        if (input === "" || input === null) {
            return 1;
        }
        else return 0;
    }

    render() {
        return (
            <div id="background">
                
                <div className="container">
                  
                    <h1>CU Simulator</h1>
            
                    <form autoComplete="on">
            
                      <div className="txt_field">
                        <label htmlFor="username">Username</label>
                        <br></br>
                        <input type="text" name="username" required></input>
                        <label htmlFor="password">Password</label>
                        <br></br>
                        <input type="password" name="password" required></input>
                      </div>

                      <div className="buttons" onClick={this.userLogin}>
                      
                      
                      {/*<Router>
                          <Routes>
                            <Route path="/forgetPassword" element={<ForgetPassword />} />
                            <Route path="/registration" element={<Registration />} />
                          </Routes>
                          <Link to={"/forgetPassword"}>Forgot password?</Link>
                          <Link to={"/registration"}>Register now!</Link>
                        </Router> */}
                        
                        
                        <a href="./ForgetPassword.js">Forgot password?</a>
                        <input id="submit_box" type="submit" value="Login"></input>
                        <p className="register">Don't have an account? <a href="./Registration.js">Register now!</a></p>
                      </div>
            
                    </form>
                    
                </div>

                <div className="copyright">
                    CSCI3100 project B4 (Below is for testing)
                    <br></br>
                    <button className="btn btn-outline-primary" onClick={this.send_request}>get a data from backend</button>
                    <br></br>
                    <div id="test">
                        <div>
                            <h3>aaaa</h3>
                            <p>{process.env.REACT_APP_BASE_URL}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;