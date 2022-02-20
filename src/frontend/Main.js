import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css';
import PopSchdule from './Main_button_component/schdule';


class Main extends React.Component {

    constructor(props) {
        super(props);
        this.popFriendLlist = this.popFriendLlist.bind(this);
        this.popCheckStatus = this.popCheckStatus.bind(this);
        this.popSchdule = this.popSchdule.bind(this);
        this.popMessageBox = this.popMessageBox.bind(this);
        this.state = { color: "#282c34", schedulePop : false, scheduleOpenText: "Open schedule"};

    }

    closeSchedule(){
        this.setState({schedulePop: false});
    }

    popFriendLlist() {
        console.log("pop friend list");
    }

    popCheckStatus() {
        console.log("Check status");
    }

    popSchdule() {
        console.log("open schedule");
        this.setState({schedulePop : !this.state.schedulePop});   
        if (this.state.scheduleOpenText == "Open schedule"){
            this.setState({scheduleOpenText : "Close schedule"});
        }
        else{
            this.setState({scheduleOpenText : "Open schedule"});
        }
    }

    popMessageBox() {
        alert(this.state.schedulePop)
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
                <div style={{ top: 10, right: 10 }}> 
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
                </div>
                <div className="d-flex justify-content-center">
                <button className="btn btn-success" onClick={this.popFriendLlist}>Friend List</button>
                <button className="btn btn-success" onClick={this.popCheckStatus}>Check status</button>
                <button className="btn btn-success" onClick={this.popSchdule}>{this.state.scheduleOpenText}</button>
                <button className="btn btn-success" onClick={this.popMessageBox}> Message box </button>
                </div>
                <div className="d-flex justify-content-center">
                <PopSchdule trigger = {this.state.schedulePop} close_handler = {this.closeSchedule.bind(this)}>
                    <h1> This is the pop up schdule</h1>
                </PopSchdule>
                </div>
            </div>
        )
    }
}

export default Main;