import React from 'react';
import { withRouter } from '../withRouter.js';


class EmailVerified extends React.Component {
    constructor(props) {
        super(props);

    }

    async componentDidMount() {
        console.log(this.props.params.id);
        await fetch(process.env.REACT_APP_BASE_URL + "/email/confirm/" + this.props.params.id, {
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
                document.getElementById("verifyMessage").innerHTML = res.message;
            });
    }

    render() {
        return (
            <div id="verifyMessage">
                OuO
            </div>
        )
    }
}

export default withRouter(EmailVerified);