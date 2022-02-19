import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.popFriendLlist = this.popFriendLlist.bind(this);
        this.popCheckStatus = this.popCheckStatus.bind(this);
        this.popSchdule = this.popSchdule.bind(this);
        this.popMessageBox = this.popMessageBox.bind(this);
        this.state = { color: "#282c34" };
    }

    popFriendLlist() {
        console.log("pop friend list");
    }

    popCheckStatus() {
        console.log("Check status");
    }

    popSchdule() {
        console.log("pop schedule");
    }

    popMessageBox() {
        console.log("pop message box");
    }

    componentDidMount() {
         fetch(process.env.REACT_APP_BASE_URL + "/stat", {
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
                console.log(res);
                document.getElementById("gpa").innerText = res.gpa;
                document.getElementById("sports").innerText = res.sports;
                document.getElementById("happiness").innerText = res.happiness;
                document.getElementById("money").innerText = res.money;
            })
    }
 
    render() {
        return (
            <div id="main">
                <p> Welcome to CU Simulator! </p>
                <div style={{ top: 10, right: 10 }}> </div>
                <table className="statchild" >
                <thead><tr>
                        <th scope="col">Statistics</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>GPA :</td>
                        <td id="gpa">?</td>
                    </tr>
                    <tr><td>Sports :</td>
                        <td id="sports">?</td>
                    </tr>
                    <tr><td>Happiness :</td>
                        <td id="happiness">?</td>
                    </tr>
                    <tr><td>Money :</td>
                        <td id="money">?</td>
                    </tr>
                </tbody>
                </table>

                <button className="mainButton" onClick={this.popFriendLlist}>Friend List</button>
                <button className="mainButton" onClick={this.popCheckStatus}>Check status</button>
                <button className="mainButton" onClick={this.popSchdule}>Open schdule</button>
                <button className="mainButton" onClick={this.popMessageBox}> Message box </button>
            </div>
        )
    }
}

export default Main;