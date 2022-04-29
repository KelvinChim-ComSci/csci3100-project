/**************************************************************************************** 
This is the default route for App.js.
This component provides an interface for a user to log in to the game. It also provides 
links to registration and forgot password components.
To log in, the user needs to input his username and password, then click "login" button.
The system will first check whether each input is valid, then verify the account 
information with the data from database. 
If invalid data are submitted or data does not match with database, warnings will be 
displayed and the user need to input data again.
Upon successful log in, the user will be directed to the main page in main.js.
Last update: 29/4/2022 by Ku Nok Tik
****************************************************************************************/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { withRouter } from '../withRouter.js'; // router
import Loading from '../Loader.js';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.userLogin = this.userLogin.bind(this);
        this.state = {
            usernameError: "",
            passwordError: "",
            error: 0,
            loading: false
        }
    }

    // check whether input is empty 
    checkInput(inputUsername, inputPassword) {
        this.setState({ error: 0 });
        if (this.isEmpty(inputUsername)) {
            this.setState({ usernameError: "Please enter a username.", error: 1 });
        }
        else {
            this.setState({ usernameError: "" })
        }
        if (this.isEmpty(inputPassword)) {
            this.setState({ passwordError: "Please enter a password.", error: 1 });
        }
        else {
            this.setState({ passwordError: "" })
        }
    }

    // handle data submitted
    async userLogin(event) {
        event.preventDefault();
        let inputUsername = document.getElementsByName("username")[0].value;
        let inputPassword = document.getElementsByName("password")[0].value;

        await this.checkInput(inputUsername, inputPassword);

        if (this.state.error === 1)
            return;

        this.setState({ loading: true });
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
                this.setState({ loading: false })
                if (this.isLoginValid(res.errorMsg)) {
                    this.props.handleLogin(res.displayName, res.username, res.userId, res.accessLevel, res.aboutMe);
                    this.navigator('./main');
                }
                else {
                    this.displayError(res.errorMsg);
                }
            });
    }

    // redirect to page
    navigator(page) {
        this.props.navigate(page);
    }

    isLoginValid(errorMessage) {
        return (errorMessage === "none") ? 1 : 0;
    }

    isEmpty(input) {
        return (input === "" || input === null) ? 1 : 0;
    }

    // display error if data does not match with database
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

        // layout of the page
        return (
            <div id="login">
                {this.state.loading ? <Loading /> :
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
                    </div>}
            </div>
        )
    }
}

export default withRouter(Login);