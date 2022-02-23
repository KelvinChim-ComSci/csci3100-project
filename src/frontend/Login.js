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
        this.state = {
            usernameError : "",
            passwordError : ""
        }
    }


    async userLogin(event) {
        event.preventDefault();
        let inputUsername = document.getElementsByName("username")[0].value;
        let inputPassword = document.getElementsByName("password")[0].value;

        if (this.isEmpty(inputUsername)) {
            this.setState({usernameError : "Please enter a username.", passwordError : ""});
            return console.log("Please enter a username."); // subject to change
        }
        else if (this.isEmpty(inputPassword)) {
            this.setState({usernameError : "", passwordError : "Please enter a password."});
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
                this.displayError(res.errorMsg);
            }
        });
    }


    async sendRequest() {
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
            const detailsElement = document.getElementById("test");
            detailsElement.getElementsByTagName("h3")[0].innerText = res.username + '\n' + res.password;
        });
    }

    isLoginValid(errorMessage) {
        return (errorMessage === "none") ? 1 : 0;
    }

    isEmpty(input) {
        return (input === "" || input === null) ? 1 : 0;
    }

    displayError(errorMessage) {
        if (errorMessage === "No such user is found. Please try again."){
            console.log("test username");
            this.setState({usernameError : errorMessage, passwordError : ""});
        }
        else if (errorMessage === "Invalid Password. Please try again."){
            console.log("test password");
            this.setState({usernameError : "", passwordError : errorMessage});
        }
        else this.setState({usernameError : "", passwordError : ""});
        console.log("test");
    }

/*    invalidUsername() {    
        console.log("it works?");
        return (
          <div className="username_error">
            <p>{this.usernameError}</p>
          </div>
        )
    } */

    render() {
        return (
            <div id="background">
                
                <div className="container">
                  
                    <h1>CU Simulator</h1>
            
                    <form autoComplete="on">
            
                      <div className="txt_field">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" required></input>
                        <div className="error">{this.state.usernameError}</div>
                        <label htmlFor="password">Password</label>
                        <br></br>
                        <input type="password" name="password" required></input>
                        <div className="error">{this.state.passwordError}</div>
                      </div>

                      <div className="links">
                        <a href="./ForgetPassword">Forget password?</a>
                      </div>
                      
                      <div className="buttons" onClick={this.userLogin}>
                        <input id="submit_box" type="submit" value="Login"></input>
                      </div>
                      <div className="links">
                        <p>Don't have an account? <a href="./Registration">Register now!</a></p>
                      </div>
            
                    </form>
                    
                </div>

                <div className="copyright">
                    CSCI3100 project B4 (Below is for testing)
                    <br></br>
                    <button className="btn btn-outline-primary" onClick={this.sendRequest}>get admin account</button>
                    <br></br>
                    <div id="test">
                        <div>
                            <h3></h3>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;