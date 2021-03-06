/**************************************************************************************** 
This component is activated after clicking the "Register now!" button in the login page. 
By clicking the button, the system will route to the next page for register a new account.
The user have to input username, email, password and confirm password for registration.
After registration, the user will proceed to the verification stage.

Last updated: 29/4/2022 by Chim Ka Chun
****************************************************************************************/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NotificationBox from '../NotficationBox';
import Loading from '../Loader';

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
            accountCreated: false,
            loading: false
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
        let inputEmail = document.getElementById("emailid").value;

        //check all input data before create account
        await this.checkUserName();
        await this.checkEmail();
        await this.checkPassword();
        await this.checkConfirmPassword();

        //If all input data are correct, update database for the information of the new user
        if (!(this.state.emailError || this.state.passwordError || this.state.usernameError || this.state.confirmPasswordError)) {
            this.setState({ loading: true });
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
                    this.setState({ loading: false });
                    if (res.usernameError) {
                        this.setState({ usernameErrMsg: res.usernameError });
                        this.setState({ usernameError: true });
                    }
                    if (res.emailError) {
                        this.setState({ emailErrMsg: res.emailError });
                        this.setState({ emailError: true });
                    }
                    if (!(res.usernameError || res.emailError)) {
                        this.setState({ accountCreated: true });
                    }
                });
        }
    }

    render() {
        require('./Registration.css');

        const renderContent = () => {
            if (this.state.accountCreated) {
                return (<div id="registration">
                    <NotificationBox message="Create new account successfully! Please check your email for verification." login={false} />
                </div>)
            }
            else {
                return (
                    <div id="registration">
                        {this.state.loading ? <Loading /> :
                            <div className="container">

                                <h1>CU Simulator</h1>

                                <form autoComplete="on">

                                    <div className="txt_field">

                                        <label htmlFor="username">Username</label>
                                        <input type="text" id="usernameid" name="username" required></input>
                                        <div className="error">{this.state.usernameErrMsg}</div>

                                        <label htmlFor="email">Email</label>
                                        <input type="text" id="emailid" name="email" required></input>
                                        <div className="error">{this.state.emailErrMsg}</div>

                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="passwordid" name="password" required></input>
                                        <div className="error">{this.state.passwordErrMsg}</div>

                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input type="password" id="confirmpasswordid" name="confirmPassword" required></input>
                                        <div className="error">{this.state.confirmPasswordErrMsg}</div>
                                    </div>

                                    <div className="buttons">
                                        <input id="submit_box" type="submit" value="Create Account!" onClick={this.createAccount}></input>
                                    </div>
                                    <div className="links">
                                        <p><a href="./">Return to log in</a></p>
                                    </div>

                                </form>

                            </div>}
                    </div>
                )
            }
        }

        return (
            <div id="forgot_password">
                {renderContent()}
            </div>
        )

    }
}

export default Registration;




