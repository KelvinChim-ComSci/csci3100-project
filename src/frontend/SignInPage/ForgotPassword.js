import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NotificationBox from '../NotficationBox';
import Loading from '../Loader';


class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usernameError: "",
            emailSent: false,
            message: "",
            loading: false
        }
        this.sendEmail = this.sendEmail.bind(this);
    }

    async sendEmail(event) {
        event.preventDefault();
        let inputUsername = document.getElementById("usernameid").value;
        this.setState({ loading: true })
        await fetch(process.env.REACT_APP_BASE_URL + "/email/forgetpassword", {
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
                this.setState({ loading: false })
                if (res.usernameError) {
                    this.setState({ usernameError: "Username does not exist" })
                }
                if (!(res.usernameError)) {
                    this.setState({ usernameError: "", emailSent: true, message: res.message })
                }
            });
    }


    render() {
        require('./ForgotPassword.css');

        const renderContent = () => {
            if (this.state.emailSent) {
                return <NotificationBox message={this.state.message} login={false} />
            }
            else {
                return (

                    <div id="forgot_password">
                        {this.state.loading ? <Loading /> :
                            <div className="container">

                                <h1>CU Simulator</h1>

                                <form autoComplete="on">

                                    <div className="txt_field">

                                        <label htmlFor="username">Username</label>
                                        <input type="text" id="usernameid" name="username" required></input>
                                        <div className="error">{this.state.usernameError}</div>

                                    </div>

                                    <div className="buttons" onClick={this.sendEmail}>
                                        <input id="submit_box" type="submit" value="Send email"></input>
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

export default ForgotPassword;

