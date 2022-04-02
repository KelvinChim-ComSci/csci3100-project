import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { withRouter } from './withRouter.js';
import Schedule from './Main_button_component/schedule';
import Profile from './Main_button_component/profile';
import Map from './Main_button_component/map';
import MainEvent from './Main_button_component/mainEvent';
import { statScheduleUpdate } from './statUpdater/statUpdateFrontend.js';
import { statBackendUpdate } from './statUpdater/statUpdateBackend.js';
import { statEventUpdate } from './statUpdater/statEventUpdate.js';
import { statRetrievebyId } from './statUpdater/statRetrievebyId.js';
import FriendList from './friendList';
import main_bg from '../backend/background/main.jpeg';
import Event from './Event';
import StatDisplay from './statDisplay';

class Main extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            popUpBar : "",
            stat : null,
            location : "main",
            started : 0,
            overflow : 1,
            beenTo : [],
        };

        this.statRef = React.createRef();

        this.userLogout = this.userLogout.bind(this);
        this.handleSchedulePlan = this.handleSchedulePlan.bind(this);
        this.checkRefreshAndUpdate = this.checkRefreshAndUpdate.bind(this);

        this.handlePopClose = this.handlePopClose.bind(this);
        this.handleMaineventStat = this.handleMaineventStat.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.popMainEvent = this.popMainEvent.bind(this);
        this.setEvent = this.setEvent.bind(this);
        this.resetData = this.resetData.bind(this);
        this.setOverflow = this.setOverflow.bind(this);

    }

    resetData(){
        const stat = {
            gpa: 4,
            happiness: 10,
            money: 10,
            sem: 0,
            sports: 10,
            stamina: 100,
            user: this.state.stat.user,
            year: 1,
            _id: this.state.stat._id,
        }
        this.updateStat(stat);
    }

    setEvent(started){
        this.setState({started : started});
    }

    updateStat(stat){
        this.statRef.current.update(stat);
        if (this.state.stat && !(this.state.stat.sem === stat.sem && this.state.stat.year === stat.year))
            this.setState({ beenTo: []});
        this.setState({ stat: { ...this.state.stat, ...stat } });
        statBackendUpdate(stat);
        new Promise(resolve => setTimeout(resolve, 1));
        if (stat.year === 1 && stat.sem === 0){
            this.setState({popUpBar : "mainEvent"});
        }
    }
 
    handleLocation(location){
        if (location != "main"){
            this.updateStat({ ...this.state.stat, stamina: this.state.stat.stamina - 5});
            this.setState({beenTo: this.state.beenTo.concat(location)});
        }
        this.setState({location: location});
    }

    popMainEvent() {
        if (this.state.stat.year > 4)
            return;
        this.setState({popUpBar : "mainEvent"});
    }

    handlePopClose() {
        this.setState({popUpBar : ""});
    }

    statUpdateFromBackend(ID) {
        statRetrievebyId(ID)
        .then((res) => {
            this.updateStat(res);
        }); 
    }

    componentDidMount() {
        this.checkRefreshAndUpdate();
        console.log("hello guys welcome")
    }

    async checkRefreshAndUpdate() {
        if (window.sessionStorage.getItem("isLoggedIn")) {
            await this.props.handleSessionRefresh();
        }
        this.statUpdateFromBackend(this.props.userId);
    }

    setOverflow(val){
        this.setState({overflow: val});
    }

    popUp(option) {
        if (option === "profile"){
            require("./Main_button_component/profile.css");
            return (
                <div className="mainPopUp">
                    <div id="shadowLayer" />
                    <button className="closeButton" onClick={() => {this.setState({popUpBar : ""})}}>x</button>
                    <div className="popUp" style={{overflow: this.state.overflow? "auto" : "clip"}}>
                        <Profile stat={this.state.stat} displayName={this.props.displayName} username={this.props.username} friend={false} setOverflow={this.setOverflow}/>
                    </div>
                </div>

            )
        }
            
        if (option === "map"){
            return (
                <div className="mainPopUp">
                    <div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => {this.setState({popUpBar : ""})}}>x</button>
                    <div className="popUp">
                        <Map handleLocation = {this.handleLocation} handlePopClose = {this.handlePopClose} available = {!this.state.started} stamina = {this.state.stat.stamina} beenTo = {this.state.beenTo}/>
                    </div>
                </div>
            )
        }
        if (option === "logout"){
            return (
                <div className="mainPopUp">
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
                <div className="mainPopUp">
                    <div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => {this.setState({popUpBar : ""})}}>x</button>
                    <div className="popUp" style={{overflow: this.state.overflow? "auto" : "clip"}}>
                        <Schedule popMainEvent = {this.popMainEvent} handleSchedulePlan={this.handleSchedulePlan} setOverflow={this.setOverflow}/>
                    </div>
                </div>
            )
        }

        if (option === "mainEvent"){
            return (
                <div className="mainPopUp">
                    <div id="shadowLayer"></div>
                    <div className="popUp">
                        <MainEvent stat = {this.state.stat} handleMaineventStat = {this.handleMaineventStat} handlePopClose = {this.handlePopClose}/>
                    </div>
                </div>
            )
        }

        if (option === "friend"){
            return (
                <div className="mainPopUp">
                    <div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => {this.setState({popUpBar : ""})}}>x</button>
                    <div className="popUp" style={{overflow: this.state.overflow? "auto" : "clip"}}>
                        <FriendList stat = {this.state.stat} setOverflow={this.setOverflow}/>
                    </div>
                </div>
            )
        }

        if (option === "setStat"){
            return (
                <div className="mainPopUp">
                    <div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => {this.setState({popUpBar : ""})}}>x</button>
                    <div className="popUp" id="setStat">
                        <h2><center>Set statistics</center></h2>
                        <br></br>

                            GPA: 
                            <input type="text" id="GPA" name="GPA" defaultValue={this.state.stat.gpa}/><br></br>
                            Sports: 
                            <input type="text" id="Sports" name="Sports" defaultValue={this.state.stat.sports}/><br></br>
                            Happiness: 
                            <input type="text" id="Happiness" name="Happiness" defaultValue={this.state.stat.happiness}/><br></br>
                            Money: 
                            <input type="text" id="Money" name="Money" defaultValue={this.state.stat.money}/><br></br>
                            Stamina: 
                            <input type="text" id="Stamina" name="Stamina" defaultValue={this.state.stat.stamina}/><br></br>
                            Year: 
                            <input type="text" id="Year" name="Year" defaultValue={this.state.stat.year}/>
                            Sem:
                            <input type="text" id="Sem" name="Sem" defaultValue={this.state.stat.sem}/><br></br>
                            <br></br>

                            <button className="btn btn-success" onClick={()=>{
                                const stat = {
                                    gpa: parseInt(document.getElementById("GPA").value),
                                    happiness: parseInt(document.getElementById("Happiness").value),
                                    money: parseInt(document.getElementById("Money").value),
                                    sem: parseInt(document.getElementById("Sem").value),
                                    sports: parseInt(document.getElementById("Sports").value),
                                    stamina: parseInt(document.getElementById("Stamina").value),
                                    user: this.state.stat.user,
                                    year: parseInt(document.getElementById("Year").value),
                                    _id: this.state.stat._id,
                                };
                                console.log(stat);
                                this.setState({popUpBar: ""});
                                this.updateStat(stat);
                            }}>Update</button>

                    </div>
                </div>
            )
        }

        return;
    }

    leftComponent(){
        if (this.state.location === "main"){
            return (
                <div className="split left" style={{backgroundImage: `url(${main_bg})`}}>
                    <h2>Welcome to CU Simulator!</h2>
                    <button className="btn btn-success" onClick={() => this.setState({popUpBar : "schedule"})}>Open schedule</button>
                    <button className="btn btn-success" onClick={this.resetData}>Reset Data</button>
                    <button className="btn btn-success" onClick={()=>{this.setState({popUpBar: "setStat"})}}>Set stat</button>
                </div>
            )
        }
        else {
            return (
                <div className="split left">
                    <Event year = {this.state.stat.year} sem = {this.state.stat.sem} stamina = {this.state.stat.stamina} handleMaineventStat = {this.handleMaineventStat}  location = {this.state.location} handleLocation = {this.handleLocation} setEvent = {this.setEvent}/>
                </div>
            )
        }
    }

    adminOnly(){
        const isAdmin = window.sessionStorage.getItem("isAdmin");
        if (isAdmin === "true")
            return (
                <div className="d-flex flex-column">
                    <h2>Admin</h2>
                    <button className="btn btn-success" onClick={()=>{console.log("to be implemented")}}>Show user</button>
                    <button className="btn btn-success" onClick={()=>{this.setState({popUpBar: "setStat"})}}>Set stat</button>
                </div>
            )
        else
            return;

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
        this.updateStat(newStat);
        return;
    }

    async handleMaineventStat(dia_line_sub, sideEvent){
        this.setState({popUpBar : ""});
        await new Promise(resolve => setTimeout(resolve, 1));
        let newStat = this.state.stat;
        console.log("Before: ", newStat);
        newStat = statEventUpdate(newStat,dia_line_sub);
        if (sideEvent)
            newStat = { ...newStat, stamina: newStat.stamina - 20};
        console.log("handle Main event After: ", newStat);
        await new Promise(resolve => setTimeout(resolve, 1));
        this.setState({
            stat: newStat
        })
        this.updateStat(newStat);
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
        .catch((error) => console.log(error));
    }

    render() {
        require('./Main.css');
        return (
            <div id="main">

                <div>
                    {this.leftComponent()}
                </div>

                <div className="split right d-flex flex-column">
                
                    <h2>Statistics</h2>
                    <StatDisplay stat={this.state.stat} ref={this.statRef}/>
                    <br></br>
                    <h2>Buttons</h2>
                    <button className="btn btn-success" onClick={() => this.setState({popUpBar : "friend"})}>Friend List</button>
                    <button className="btn btn-success" onClick={() => this.setState({popUpBar : "profile"})}>Check profile</button>
                    <button className="btn btn-success" onClick={() => this.setState({popUpBar : "map"})}>Explore CUHK!</button>
                    <button className="btn btn-success" onClick={() => window.open("http://" + window.location.host + "/changepassword/" + this.props.userId)}>Change Password</button>
                    <button className="btn btn-success" onClick={() => this.setState({popUpBar : "logout"})}>Logout</button>
                    <br></br>
                    {this.adminOnly()}
                </div>

                {this.popUp(this.state.popUpBar)}

            </div>

        )
    }
}

export default withRouter(Main);

