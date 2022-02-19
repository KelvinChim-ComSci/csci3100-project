import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    async send_request() {
        await fetch(process.env.REACT_APP_BASE_URL + "/login", {
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": true,
            }),
        }
        )
            .then((res) => res.json())
            .then((res) => {
                console.log("hi\n");
                console.log(res);
                //const parsedData = res.text();
                //console.log(parsedData);

                const detailsElement = document.getElementById("test");
                detailsElement.getElementsByTagName("h1")[0].innerText = res.name;
                //detailsElement.getElementsByTagName("p")[0].innerText = data.name;
            })
    }

    render() {
        return (
            <div id="background">
                
                <div className="container">
                    <div id="box1">
                      CU Simulator
                    </div>
                    <div id="box2">
                      form
                    </div>
                    <div id="box3">
                      Forget password?
                    </div>
                    <div id="box4">
                      Register new account
                    </div>
                    
                </div>







                {/*<button className="btn btn-outline-primary" onClick={this.send_request}>get a data from backend</button>
                <br></br>
                <div id="test">
                    <div>
                        <h1>aaaa</h1>
                        <p>{process.env.REACT_APP_BASE_URL}</p>
                    </div>
                </div> */}
            </div>
        )
    }
}

export default Login;