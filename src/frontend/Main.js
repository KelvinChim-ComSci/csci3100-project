import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Main.css';
import { withRouter } from './withRouter.js';
import Schedule from './Main_button_component/schedule';
import Status from './Main_button_component/status';
import Map from './Main_button_component/map';

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
        this.addStat = this.addStat.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleSchedulePlan = this.handleSchedulePlan.bind(this);

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
                    stat: res
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
                        <Schedule handleSchedulePlan={this.handleSchedulePlan}/>
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

        //transition here
        
        /*
        sequence of events stored in plan
        's'->study                    gpa+1, stamina-20
        'w'->part time                money+1, stamina-20
        'g'->gym                      sports+1, stamina-20
        'f'->hang out with friends    happiness+1, stamina-20
        'r'->rest                     stamina-50
        */

        let newStat = this.state.stat;
        console.log("Before: ", newStat);

        for (let i = 0; i < plan.length; i++) {
            switch(plan[i]) {
                case "s":
                    newStat = {
                        ...newStat,
                        gpa: newStat.gpa+1,
                        stamina: newStat.stamina-20,
                    }
                    break;
                case "w":
                    newStat = {
                        ...newStat,
                        money: newStat.money+1,
                        stamina: newStat.stamina-20,
                    }
                    break;
                case "g":
                    newStat = {
                        ...newStat,
                        sports: newStat.sports+1,
                        stamina: newStat.stamina-20,
                    }
                    break;
                case "f":
                    newStat = {
                        ...newStat,
                        happiness: newStat.happiness+1,
                        stamina: newStat.stamina-20,
                    }
                    break;
                case "r":
                    let newStamina = ((newStat.stamina>50) ? 100 : newStat.stamina+50);
                    console.log(newStamina);
                    newStat = {
                        ...newStat,
                        stamina: newStamina,
                    }
                    break;
            }
            if (newStat.stamina < 0){
                alert("You died. F");
                newStat = {
                    ...newStat,
                    stamina: 50,
                }
                break;
            }
            console.log(i);
        }
        if (newStat.sem === 2)
            newStat = {
                ...newStat,
                sem: 1,
                year: newStat.year+1,
            }
        else
            newStat = {
                ...newStat,
                sem: newStat.sem+1,
            }

        console.log("After: ", newStat);
        this.setState({
            stat: newStat,
        })

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
                        <tr><td><button onClick={()=>this.addStat("gpa")}>Study</button></td>
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