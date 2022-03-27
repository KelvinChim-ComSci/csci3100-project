import React from "react";
import { withRouter } from './withRouter.js';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.adminLogout = this.adminLogout.bind(this);
    }

    async adminLogout() {
        await fetch(process.env.REACT_APP_BASE_URL + "/logout", {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": true,
            }),
            body: JSON.stringify({
                username: this.props.username
            }),
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res.logoutMsg);
            this.props.handleLogout();
            this.props.navigate("../");
        })
    }
    render(){
        return (
            <div id="adminPage">
                <button className="btn btn-success" onClick={this.adminLogout}>Logout</button><br />
                <b>
                    Please use [username: testPlayer, password: testing3100] for player testing. <br />
                    This page will be reserved for admin actions.
                </b>
            </div>
        )
    }
}

export default withRouter(AdminPage);
