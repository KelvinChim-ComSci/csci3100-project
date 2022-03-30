import React from 'react';
import { withRouter } from '../withRouter.js';
import 'bootstrap/dist/css/bootstrap.css';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validURL: false,
            passwordError: false,
            confirmPasswordError: false,
            passwordErrMsg: "",
            confirmPasswordErrMsg: "",
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkConfirmPassword = this.checkConfirmPassword.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
    }

    async componentDidMount() {
        await fetch(process.env.REACT_APP_BASE_URL + "/resetpassword/" + this.props.params.id, {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": true,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                this.setState({ validURL: res.validURL })
                console.log(":3", res.message, this.state.validURL);
            });
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


    async resetPassword(event) {
        event.preventDefault();

        this.checkPassword();
        this.checkConfirmPassword();
        if (!(this.state.passwordError || this.state.confirmPasswordError)) {

            console.log(this.props.params.id);
            /*let inputUsername = document.getElementById("usernameid").value;
            await fetch(process.env.REACT_APP_BASE_URL + "/resetpassword/" + this.props.params.id, {
                method: "POST",
                headers: new Headers({
                    "Content-Type": 'application/json',
                    "Accept": 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Credentials": true,
                }),
                body: JSON.stringify({
                    username: inputUsername
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res)
                    if (res.usernameError) {
                        console.log("err")
                        alert(res.usernameError)
                    }
                    if (!(res.usernameError)) {
                        alert(res.message)
                    }
                });*/
        }
    }

    render() {
        require('./ChangePassword.css');

        const renderContent = () => {
            if (this.state.validURL) {
                return <div className="container">

                    <h1>CU Simulator</h1>

                    <h3>Reset Password</h3>

                    <form autoComplete="on">

                        <div className="txt_field">

                            <label htmlFor="password">New Password</label>
                            <input type="text" id="passwordid" name="password" required></input>
                            <div className="error">{this.state.passwordErrMsg}</div>

                        </div>

                        <div className="txt_field">

                            <label htmlFor="confirmpassword">Confirm New Password</label>
                            <input type="text" id="confirmpasswordid" name="confirmpassword" required></input>
                            <div className="error">{this.state.confirmPasswordErrMsg}</div>

                        </div>

                        <div className="buttons" onClick={this.resetPassword}>
                            <input id="submit_box" type="submit" value="Reset Password"></input>
                        </div>

                    </form>

                </div>
            } else {
                return <div className="container"> Invalid URL</div>;
            }
        }

        return (

            <div id="forgot_password">
                {renderContent()}
            </div>
        )
    }
}

export default withRouter(ChangePassword);