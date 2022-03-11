import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css';
import { withRouter } from './withRouter.js';
import Schedule from './Main_button_component/schedule';
import Status from './Main_button_component/status';
import Map from './Main_button_component/map';
import { statScheduleUpdate } from './statUpdater/statUpdateFrontend.js';
import { statBackendUpdate } from './statUpdater/statUpdateBackend.js';
import FriendList from './friendList';
import MainEvent from './Main_button_component/mainEvent';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popUpBar : "",
            stat : null,
        };

        this.userLogout = this.userLogout.bind(this);
        this.popFriendLlist = this.popFriendLlist.bind(this);
        this.popMessageBox = this.popMessageBox.bind(this);
        this.handleSchedulePlan = this.handleSchedulePlan.bind(this);
        this.checkRefreshAndUpdate = this.checkRefreshAndUpdate.bind(this);
        this.popMainEvent = this.popMainEvent.bind(this);
        this.handlePopClose = this.handlePopClose.bind(this);

    }

    popFriendLlist() {
        console.log("pop friend list");
        this.setState({popUpBar : "friend"});
    }

    popMessageBox() {
        alert(this.state.schedulePop)
        console.log("pop message box");
        this.setState({popUpBar : "message"});
    }

    popMainEvent() {
        console.log("pop mainEvent");
        this.setState({popUpBar : "mainEvent"});
    }

    handlePopClose() {
        this.setState({popUpBar : ""});
    }

    statUpdateFromFrontend() {
        document.getElementById("gpa").innerText = this.state.stat.gpa;
        document.getElementById("sports").innerText = this.state.stat.sports;
        document.getElementById("happiness").innerText = this.state.stat.happiness;
        document.getElementById("money").innerText = this.state.stat.money;      
        document.getElementById("_id").innerText = this.state.stat._id;
        document.getElementById("stamina").innerText = this.state.stat.stamina;
        document.getElementById("sem").innerText = this.state.stat.sem;
        document.getElementById("year").innerText = this.state.stat.year;
    }

    statUpdateFromBackend() {
        fetch(process.env.REACT_APP_BASE_URL + "/stat/retrieve", {
        method: "POST",
        headers: new Headers({
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Credentials": true,
        }),
        body: JSON.stringify({
            userId: this.props.userId
            })
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            this.setState({
                stat: res
            });
            this.statUpdateFromFrontend();
        })
    }

    
    componentDidMount() {
        this.checkRefreshAndUpdate();
    }
    
    async checkRefreshAndUpdate() {
        if (window.sessionStorage.getItem("isLoggedIn")) {
            await this.props.handleSessionRefresh();
        }
        this.statUpdateFromBackend();
    }


    popUp(option) {
        console.log("current Pop-up: ", this.state.popUpBar);
        if (option === "status")
            return (
                <div>
                    <div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => {this.setState({popUpBar : ""})}}>x</button>
                    <div className="popUp">
                        <Status stat={this.state.stat} />
                    </div>
                </div>

            )
        if (option === "map"){
            return (
                <div>
                    <div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => {this.setState({popUpBar : ""})}}>x</button>
                    <div className="popUp">
                        <Map />
                    </div>
                </div>
            )
        }
        if (option === "logout"){
            return (
                <div>
                    <div id="shadowLayer"></div>
                    <div className="popUp" id="logout">
                        <h4>Are you sure to log out?</h4>
                        <br></br>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-success" onClick={this.userLogout}>Yes</button>
                            <button className="btn btn-success" onClick={() => {this.setState({popUpBar : ""})}}>No</button>
                        </div>
                    </div>
                </div>
            )
        }

        if (option === "schedule"){
            return (
                <div>
                    <div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => {this.setState({popUpBar : ""})}}>x</button>
                    <div className="popUp">
                        <Schedule popMainEvent = {this.popMainEvent} handleSchedulePlan={this.handleSchedulePlan}/>
                    </div>
                </div>
            )
        }

        if ((option === "mainEvent")){
            return (
                <div>
                    <div id="shadowLayer"></div>
                    <div className="popUp">
                        <MainEvent handlePopClose = {this.handlePopClose}/>
                    </div>
                </div>
            )
        }
        else {
            return 
        }

    }

    async handleSchedulePlan(plan){
        this.setState({popUpBar : ""});
        console.log(plan);
        await new Promise(resolve => setTimeout(resolve, 1));
        let newStat = this.state.stat;
        console.log("Before: ", newStat);
        newStat = statScheduleUpdate(newStat,plan);
        console.log("After: ", newStat);
        await new Promise(resolve => setTimeout(resolve, 1));
        statBackendUpdate(newStat);
        this.setState({
            stat: newStat
        })
        this.statUpdateFromFrontend();
        return;
    }


    async userLogout() {
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

    render() {
        return (
            <div id="main">

                

                <p> Welcome to CU Simulator! </p>
                <div className="d-flex justify-content-center">
                <button className="btn btn-success" onClick={this.popFriendLlist}>Friend List</button>
                <button className="btn btn-success" onClick={() => this.setState({popUpBar : "status"})}>Check status</button>
                <button className="btn btn-success" onClick={() => this.setState({popUpBar : "schedule"})}>Open schedule</button>
                <button className="btn btn-success" onClick={this.popMessageBox}>Message box</button>
                <button className="btn btn-success" onClick={() => this.setState({popUpBar : "map"})}>Explore CUHK!</button>
                <button className="btn btn-success" onClick={() => this.setState({popUpBar : "logout"})}>Logout</button>
                </div>

                <div className='container-fluid'>
                <div className = "row">
                <section id="statusList" className = "col-sm-3 col-lg-3 col-xl-3">

                    <table>
                    <thead><tr>
                            <th scope="col">Statistics</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>User id :</td>
                            <td id="_id">?</td>
                        </tr>
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
                        <tr><td>Stamina :</td>
                            <td id="stamina">?</td>
                        </tr>
                        
                    </tbody>
                    </table>
                </section>

                <section id="friendList" className = "col-sm-3 col-lg-3 col-xl-3">
                        <h2>Friends</h2>
                </section>


                </div> {/* row */}
                </div> {/* container-fluid */}

                {this.popUp(this.state.popUpBar)}
            
                <div className = "statBottomRight bg-success text-white rounded text-center"><b> Year <b id= "year">x</b> sem <b id= "sem">y</b> </b></div>
                <FriendList />
            </div> 
        )
    }
}

export default withRouter(Main);