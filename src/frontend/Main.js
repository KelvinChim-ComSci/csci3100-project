import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css';
import { withRouter } from './withRouter.js';
import Schedule from './Main_button_component/schdule';
import Status from './Main_button_component/status';
import displayMap from './Main_button_component/map';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            popUpBar : "",
            res : null,
        };

        this.userLogout = this.userLogout.bind(this);
        
        this.popFriendLlist = this.popFriendLlist.bind(this);
        this.popCheckStatus = this.popCheckStatus.bind(this);
        this.popSchdule = this.popSchdule.bind(this);
        this.popMessageBox = this.popMessageBox.bind(this);
        this.popMap = this.popMap.bind(this);
        this.popLogout = this.popLogout.bind(this);
        this.addStat = this.addStat.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }

    popFriendLlist() {
        console.log("pop friend list");
        this.setState({popUpBar : "friend"});
    }

    popCheckStatus() {
        console.log("Check status");
        this.setState({popUpBar : "status"});
    }

    popSchdule() {
        console.log("open schedule");
        this.setState({popUpBar : "schedule"});
    }

    popMessageBox() {
        alert(this.state.schedulePop)
        console.log("pop message box");
        this.setState({popUpBar : "message"});
    }

    popLogout() {
        console.log("pop logout");
        this.setState({popUpBar : "logout"});
    }

    popMap() {
        console.log("pop map");
        this.setState({popUpBar : "map"});
    }

    componentDidMount() {
         fetch(process.env.REACT_APP_BASE_URL + "/stat", {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": true,
            }),
            body: JSON.stringify({
                userId: this.props.userId,
            })
        }
        )
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                document.getElementById("gpa").innerText = res.gpa;
                document.getElementById("sports").innerText = res.sports;
                document.getElementById("happiness").innerText = res.happiness;
                document.getElementById("money").innerText = res.money;      
                document.getElementById("_id").innerText = res._id;
                document.getElementById("stamina").innerText = res.stamina;
                document.getElementById("sem").innerText = res.sem;
                document.getElementById("year").innerText = res.year;
                this.setState({
                    res: res
                })
            })
    }
    
    addStat(toadd) {
        console.log("123");
        console.log(document.getElementById(toadd).value);
        fetch(process.env.REACT_APP_BASE_URL + "/addStat", {
           method: "POST",
           headers: new Headers({
               "Content-Type": 'application/json',
               "Accept": 'application/json',
               "Access-Control-Allow-Origin": "*",
               "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
               "Access-Control-Allow-Credentials": true,
           }),
           body: JSON.stringify({
            id: document.getElementById("_id").innerText,
            corr: toadd,
            val: parseInt(document.getElementById(toadd).innerText),
        }),
       }
       )
           .then((res) => res.json())
           .then((res) => {
               console.log(res.gpa);
               this.componentDidMount();
           })
    }

    popUp(option) {
        
        console.log(this.state.popUpBar);
        if (option === "status")
            return (
                <div>
                    <div id="shadowLayer"></div>
                    <div className="popUp">
                        <button className="closeButton" onClick={() => {this.setState({popUpBar : ""})}}>x</button>
                        <Status res={this.state.res} />
                    </div>
                </div>

            )
        if (option === "map"){
            return (
                <div>
                    <div id="shadowLayer"></div>
                    <div className="popUp">
                        <button className="closeButton" onClick={() => {this.setState({popUpBar : ""})}}>x</button>
                        {displayMap()}
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
                    <div className="popUp">
                        <button className="closeButton" onClick={() => {this.setState({popUpBar : ""})}}>x</button>
                        <Schedule />
                    </div>
                </div>
            )
        }



        else {
            return 
        }
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
                <button className="btn btn-success" onClick={this.popCheckStatus}>Check status</button>
                <button className="btn btn-success" onClick={this.popSchdule}>Open schedule</button>
                <button className="btn btn-success" onClick={this.popMessageBox}>Message box</button>
                <button className="btn btn-success" onClick={this.popMap}>Explore CUHK!</button>
                <button className="btn btn-success" onClick={this.popLogout}>Logout</button>
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

            </div> 
        )
    }
}

export default withRouter(Main);