import React from 'react';
import { withRouter } from '../withRouter.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.css';
import NotificationBox from '../NotficationBox.js';
import Loading from '../Loader.js';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            validURL: false,
            passwordError: false,
            confirmPasswordError: false,
            passwordErrMsg: "",
            confirmPasswordErrMsg: "",
            message: "invalid URL",
            loading: true
        }

        this.id = (this.props.loginPage) ? this.props.params.id : this.props.id;

        this.componentDidMount = this.componentDidMount.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.checkConfirmPassword = this.checkConfirmPassword.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
        this.resetEmailSent = this.resetEmailSent.bind(this);
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
                this.setState({ validURL: res.validURL, loading: false })
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

        await this.checkPassword();
        await this.checkConfirmPassword();
        if (!(this.state.passwordError || this.state.confirmPasswordError)) {
            this.setState({ loading: true });
            let inputPassword = document.getElementById("passwordid").value;
            await fetch(process.env.REACT_APP_BASE_URL + "/resetpassword", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": 'application/json',
                    "Accept": 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Credentials": true,
                }),
                body: JSON.stringify({
                    id: this.id,
                    password: inputPassword
                }),
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.passwordError) {
                        this.setState({ passwordError: true, passwordErrMsg: res.passwordError });
                    }
                    else {
                        this.setState({ passwordError: false, passwordErrMsg: "", reset: true, message: res.message, loading: false });
                        if (!this.props.loginPage) {
                            toast.info(res.message, {
                                position: "bottom-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            this.props.handlePopClose();
                            this.props.setOverflow(1);
                        }
                    }


                });
        }
    }

    resetEmailSent() {
        if (this.state.reset) return <NotificationBox message={this.state.message} login={false} />
    }

    render() {
        require('./ChangePassword.css');

        const renderButtons = (loginPage) => {
            if (loginPage)
                return (
                    <div className="buttons" onClick={this.resetPassword}>
                        <input id="submit_box" type="submit" value="Reset Password"></input>
                    </div>
                )

            else
                return (
                    <div className="d-flex justify-content-around">
                        <button className="btn btn-success" onClick={(event) => { event.preventDefault(); this.props.handlePopClose(); this.props.setOverflow(1); }}>Cancel</button>
                        <button className="btn btn-success" onClick={this.resetPassword}>Confirm</button>
                    </div>
                )
        }

        const renderContent = (loginPage) => {

            //page outside main, invalid URL or already reset
            if (loginPage && ((!this.state.validURL) || this.state.reset)) {
                return (
                    <div id="change_password">
                        <NotificationBox message={this.state.message} login={false} />
                    </div>
                )
            }

            //page outside main, normal case
            else
                return (
                    <div>
                        {this.state.loading ? <Loading /> : null}
                        <div id={`${(loginPage) ? "change_password" : "changePasswordInner"}`}>

                            <div className={`${(loginPage) ? "container" : ""}`}>

                                <h1 style={{ display: `${(loginPage) ? "" : "none"}` }}>CU Simulator</h1>

                                <h3>Change Password</h3>

                                <form autoComplete="on">

                                    <div className="txt_field">

                                        <label htmlFor="password">New Password</label>
                                        <input type="password" id="passwordid" name="password" required></input>
                                        <div className="error">{this.state.passwordErrMsg}</div>

                                    </div>

                                    <div className="txt_field">

                                        <label htmlFor="confirmpassword">Confirm New Password</label>
                                        <input type="password" id="confirmpasswordid" name="confirmpassword" required></input>
                                        <div className="error">{this.state.confirmPasswordErrMsg}</div>

                                    </div>

                                    {renderButtons(loginPage)}

                                </form>

                            </div>
                        </div>
                    </div>
                )

        }

        return (

            <div id="changePassword">
                {renderContent(this.props.loginPage)}
            </div>
        )
    }
}

export default withRouter(ChangePassword);