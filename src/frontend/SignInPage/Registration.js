import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Registration.css';

class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameError: false,
            passwordError: false,
            emailError: false,
            confirmPasswordError: false,
            usernameErrMsg: "",
            passwordErrMsg: "",
            emailErrorMsg: "",
            confirmPasswordErrMsg: "",
        }

        this.checkUserName = this.checkUserName.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkConfirmPassword = this.checkConfirmPassword.bind(this);
    }

    // check user input username
    checkUserName() {
        const usernameFormat = /^[0-9a-zA-Z\-_]+$/;
        let username = document.getElementById("usernameid").value;

        if (username === "") {
            this.setState({ usernameErrMsg: "Please fill in the username." });
            this.setState({ usernameError: true });
        }
        else if (username.length < 4 || username.length > 20 || !username.match(usernameFormat)) {
            this.setState({ usernameErrMsg: "Username must be 4 to 20 characters, contains letters, numbers, hyphens and underscores" });
            this.setState({ usernameError: true });
        }
        else {
            this.setState({ usernameErrMsg: "" });
            this.setState({ usernameError: false });
        }
    }

    // check user input email is in correct email format or not
    checkEmail() {
        let email = document.getElementById("emailid").value;
        const emailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email === "") {
            this.setState({ emailErrMsg: "Please fill in email" });
            this.setState({ emailError: true });
        }
        else if (!email.match(emailformat)) {
            this.setState({ emailErrMsg: "Invalid Email" });
            this.setState({ emailError: true });
        } else {
            this.setState({ emailErrMsg: "" });
            this.setState({ emailError: false });
        }
    }

    // check user input password
    checkPassword() {
        let password = document.getElementById("passwordid").value;
        if (password === "") {
            this.setState({ passwordErrMsg: "Please fill in the password." });
            this.setState({ passwordError: true });
        } else if (password.length < 8) {
            this.setState({ passwordErrMsg: "Length of password must be longer than 8 characters." });
            this.setState({ passwordError: true });
        } else {
            this.setState({ passwordErrMsg: "" });
            this.setState({ passwordError: false });
        }
    }

    // check user input confirm password
    checkConfirmPassword() {
        let password = document.getElementById("passwordid").value;
        let confirmpassword = document.getElementById("confirmpasswordid").value;

        if (confirmpassword === "") {
            this.setState({ confirmPasswordErrMsg: "Please fill in the confirm password" });
            this.setState({ confirmPasswordError: true });
        }
        else if (confirmpassword !== password) {
            this.setState({ confirmPasswordErrMsg: "The confirm password is not the same as password." });
            this.setState({ confirmPasswordError: true });
        } else {
            this.setState({ confirmPasswordErrMsg: "" });
            this.setState({ confirmPasswordError: false });
        }
    }


    async createAccount(event) {
        event.preventDefault();

        let inputUsername = document.getElementById("usernameid").value;
        let inputPassword = document.getElementById("passwordid").value;
        let inputConfirmPassword = document.getElementById("confirmpasswordid").value;
        let inputEmail = document.getElementById("emailid").value;

        //check all input data before create account
        await this.checkUserName();
        await this.checkEmail();
        await this.checkPassword();
        await this.checkConfirmPassword();

        if (!(this.state.emailError || this.state.passwordError || this.state.usernameError || this.state.confirmPasswordError)) {
            console.log("test")

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
                        this.setState({ usernameErrMsg: res.usernameError });
                        this.setState({ usernameError: true });
                    }
                    if (res.emailError) {
                        this.setState({ emailErrMsg: res.emailError });
                        this.setState({ emailError: true });
                    }
                    if (!(res.usernameError || res.emailError)) {
                        alert("Successfully Created account! Please check your email for verification")
                    }
                });
        }
    }

    //send verification email to user (not complete yet)
    /*async sendMail() {

        let username = document.getElementById("usernameid").value;
        let usermail = document.getElementById("emailid").value;

        let mailsubject = "[CU Simulator] Email adddress Confirmation";
        let mailcontent = "Welcome to CU Simulator, " + username + "\n\n" + "Thank you for signing up with CU Simulator. Please activate your accoount by the following link:";

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
                alert("Successfully Created account! Please check your email for verification") // modify later
            });
    }*/



    render() {
        return (
            <div id="registration">

                <div className="container">

                    <h1>CU Simulator</h1>

                    <form autoComplete="on">

                        <div className="txt_field">

                            <label htmlFor="username">Username</label>
                            <input type="text" id="usernameid" name="username" required onBlurCapture={this.checkUserName}></input>
                            <div className="error">{this.state.usernameErrMsg}</div>

                            <label htmlFor="email">Email</label>
                            <input type="text" id="emailid" name="email" required onBlurCapture={this.checkEmail}></input>
                            <div className="error">{this.state.emailErrMsg}</div>

                            <label htmlFor="password">Password</label>
                            <input type="password" id="passwordid" name="password" required onBlurCapture={this.checkPassword}></input>
                            <div className="error">{this.state.passwordErrMsg}</div>

                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmpasswordid" name="confirmPassword" required onBlurCapture={this.checkConfirmPassword}></input>
                            <div className="error">{this.state.confirmPasswordErrMsg}</div>
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




