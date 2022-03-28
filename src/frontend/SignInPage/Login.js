import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { withRouter } from '../withRouter.js'; // router
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.userLogin = this.userLogin.bind(this);
        this.state = {
            usernameError: "",
            passwordError: "",
            error: 0,
        }
    }

    checkInput(inputUsername, inputPassword){
        this.setState({error: 0});
        if (this.isEmpty(inputUsername)) {
            this.setState({ usernameError: "Please enter a username.", error: 1});
            console.log("No username.");
        }
        else {
            this.setState({ usernameError: ""})
        }
        if (this.isEmpty(inputPassword)) {
            this.setState({ passwordError: "Please enter a password.", error: 1 });
            console.log("No password.");
        }
        else {
            this.setState({ passwordError: ""})
        }
    }

    async userLogin(event) {
        event.preventDefault();
        let inputUsername = document.getElementsByName("username")[0].value;
        let inputPassword = document.getElementsByName("password")[0].value;

        await this.checkInput(inputUsername, inputPassword);

        if (this.state.error === 1)
            return;

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
                    this.props.handleLogin(res.username, res.userId, res.accessLevel);
                    res.accessLevel? this.navigator('./AdminPage') : this.navigator('./main');
                }
                else {
                    console.log(res.errorMsg);
                    this.displayError(res.errorMsg);
                }
            });
    }

    navigator(page) {
        this.props.navigate(page);
    }


    async sendRequest() {
        const detailsElement = document.getElementById("test");
        detailsElement.getElementsByTagName("h3")[0].innerText = "administrator" + '\n' + "testing3100";
    }

    isLoginValid(errorMessage) {
        return (errorMessage === "none") ? 1 : 0;
    }

    isEmpty(input) {
        return (input === "" || input === null) ? 1 : 0;
    }

    displayError(errorMessage) {
        if (errorMessage === "No such user is found. Please try again.") {
            this.setState({ usernameError: errorMessage, error: 1 });
        }
        else if (errorMessage === "Invalid Password. Please try again.") {
            this.setState({ passwordError: errorMessage, error: 1 });
        }
    }

    render() {
        require('./Login.css');
        return (
            <div id="login">

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
                            <a href="./ForgotPassword">Forgot password?</a>
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

export default withRouter(Login);