import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

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

    render() {
        return (
            <div id="main">
                <p> Welcome to CU Simulator! </p>
                <div style={{ top: 10, right: 10 }}> Health point: 100 </div>
                <button className="mainButton" onClick={this.popFriendLlist}>Friend List</button>
                <button className="mainButton" onClick={this.popCheckStatus}>Check status</button>
                <button className="mainButton" onClick={this.popSchdule}>Open schdule</button>
                <button className="mainButton" onClick={this.popMessageBox}> Message box </button>
            </div>
        )
    }
}

export default Main;