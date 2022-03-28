import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordError: "",
            confirmPasswordError: ""
        }
    }


    async sendEmail(event) {
        event.preventDefault();
        /*let inputUsername = document.getElementById("usernameid").value;
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

    render() {
        require('./ChangePassword.css');
        return (
            <div id="forgot_password">

                <div className="container">

                    <h1>CU Simulator</h1>
                    <h3>Reset Password</h3>

                    <form autoComplete="on">

                        <div className="txt_field">

                            <label htmlFor="password">New Password</label>
                            <input type="text" id="passwordid" name="password" required></input>
                            <div className="error">{this.state.passwordError}</div>

                        </div>

                        <div className="txt_field">

                            <label htmlFor="password">Confirm New Password</label>
                            <input type="text" id="confirmpasswordid" name="confirmpassword" required></input>
                            <div className="error">{this.state.confirmPasswordError}</div>

                        </div>

                        <div className="buttons" onClick={this.sendEmail}>
                            <input id="submit_box" type="submit" value="Reset Password"></input>
                        </div>

                    </form>

                </div>
            </div>
        )
    }
}

export default ChangePassword;