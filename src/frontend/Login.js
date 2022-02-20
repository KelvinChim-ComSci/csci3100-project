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
    }

    async userLogin(event) {
        event.preventDefault();
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
                username: document.getElementsByName("username")[0].value,
                password: document.getElementsByName("password")[0].value
            }),
        })
        .then((res) => console.log("hi"));
        /*.then((response) => {
            console.log("hi\n");
            console.log(response);
        })*/
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