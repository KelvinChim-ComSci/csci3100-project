import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Registration.css';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameError: "",
            passwordError: "",
            emailError: "",
            confirmPasswordError: ""
        }

        this.checkUserName = this.checkUserName.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
    }

    // check user input username, may add part to check username is unique or not later
    checkUserName() {
        let username = document.getElementById("usernameid").value;
        if (username === "") {
            this.setState({ usernameError: "Please fill in the username." });
        }
        else if (username.length < 4 || username.length > 20) {
            this.setState({ usernameError: "Username must be 4 to 20 characters, contains letters, numbers, hyphens and underscores" });
        }
        else {
            this.setState({ usernameError: "" });
        }
    }

    // check user input email is in correct email format or not
    checkEmail() {
        let email = document.getElementById("emailid").value;
        const emailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.match(emailformat)) {
            this.setState({ emailError: "Invalid Email" })
        } else {
            this.setState({ emailError: "" })
        }
    }

    checkNonBlank() {

    }

    async createAccount(event) {
        event.preventDefault();

        let inputUsername = document.getElementById("usernameid").value;
        let inputPassword = document.getElementById("passwordid").value;
        let inputEmail = document.getElementById("emailid").value;

        await fetch(process.env.REACT_APP_BASE_URL + "/register", {
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
                password: inputPassword,
                email: inputEmail
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.usernameError) {
                    alert(res.usernameError) // modify later
                }
                if (res.emailError) {
                    alert(res.emailError) // modify later
                }
                if (!(res.usernameError || res.emailError)) {
                    alert("Successfully Created account") // modify later
                }
            });
    }

    //send verification email to user (not complete yet)
    async sendMail(event) {
        event.preventDefault();
        let usermail = document.getElementsByName("email")[0].value;
        let mailsubject = "Verification mail from CU Simulator";
        let mailcontent = "3100 be with U";

        await fetch(process.env.REACT_APP_BASE_URL + "/email", {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": true,
            }),
            body: JSON.stringify({
                to: usermail,
                subject: mailsubject,
                text: mailcontent
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
            });
    }



    render() {
        return (
            <div id="registration">

                <div className="container">

                    <h1>CU Simulator</h1>

                    <form autoComplete="on">

                        <div className="txt_field">

                            <label htmlFor="username">Username</label>
                            <input type="text" id="usernameid" name="username" required onBlurCapture={this.checkUserName}></input>
                            <div className="error">{this.state.usernameError}</div>

                            <label htmlFor="email">Email</label>
                            <input type="text" id="emailid" name="email" required onBlurCapture={this.checkEmail}></input>
                            <div className="error">{this.state.emailError}</div>

                            <label htmlFor="password">Password</label>
                            <input type="password" id="passwordid" name="password" required></input>
                            <div className="error">{this.state.passwordError}</div>

                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" name="confirmPassword" required></input>
                            <div className="error">{this.state.confirmPasswordError}</div>
                        </div>

                        <div className="buttons">
                            <input id="submit_box" type="submit" value="Create Account!" onClick={this.createAccount}></input>
                        </div>
                        <div className="links">
                            <p><a href="./">Return to log in</a></p>
                        </div>

                    </form>

                </div>
            </div>
        )
    }
}

export default Registration;




