/**************************************************************************************** 
This component is activated after clicking the link which is sent in the email 
verification in the stage of registration. The system will update to the database for 
the status of verification.

Last updated: 29/4/2022 by Au Tsz Nga
****************************************************************************************/

import React from 'react';
import { withRouter } from '../withRouter.js';
import Loading from '../Loader.js';


class EmailVerified extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    //Fetch the status of verification from the database
    async componentDidMount() {
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
                this.setState({ loading: false });
                document.getElementById("verifyMessage").innerHTML = res.message;

            });
    }

    render() {
        require('./EmailVerified.css');
        {
            return (

                < div id="emailVerified" >

                    {this.state.loading ? <Loading /> :
                        <div className="container">

                            <h1>CU Simulator</h1>

                            <div className="links">
                                <p id="verifyMessage" />
                                <p><a href="../../">Return to log in</a></p>
                            </div>

                        </div>}

                </div>
            )
        }
    }
}

export default withRouter(EmailVerified);