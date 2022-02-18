import React from 'react';

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
            <div>
                -------------------------------<br></br>
                Login Component
                <h5>OuO Login</h5>
                <button onClick={this.send_request}>get a data from backend</button>
                <br></br>
                <div id="test">
                    <div>
                    <h1>aaaa</h1>
                    <p>{process.env.REACT_APP_BASE_URL}</p>
                    </div>
                </div>
                -------------------------------
            </div>
        )
    }
}

export default Login;