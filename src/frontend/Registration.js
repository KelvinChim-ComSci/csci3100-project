import React from 'react';

class Registration extends React.Component {
    constructor(props) {
        super(props);
    }
    async sendMail() {
        let usermail = document.getElementsByName("email")[0].value
        let mailsubject = "Verification mail from CU Simulator"
        let mailcontent = "3100 be with U"

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
            <div>
                Registration Component
                <hr></hr>

                <div className="txt_field">
                    <label htmlFor="username">Username</label>
                    <br></br>
                    <input type="text" name="username" required></input>
                    <label htmlFor="email">Email</label>
                    <br></br>
                    <input type="text" name="email" required></input>
                    <label htmlFor="password">Password</label>
                    <br></br>
                    <input type="password" name="password" required></input>
                </div>
                <button className="btn btn-outline-primary" onClick={this.sendMail}>Send Email</button>

            </div>
        )
    }
}

export default Registration;