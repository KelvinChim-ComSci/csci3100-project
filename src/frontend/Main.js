/**************************************************************************************** 
This component is activated after successful log in from log in page.
This component serves as the main interface for the game. 
The main page is divided into left and right components.
The left component is the current location of the player, and the default location after
logging in or finishing event is the home location.
The background of the left component will change according to the current location.
In the home location, there are 3 buttons:
1. Open schedule
2. Dem個和聲Beat
3. Pause song
The first button is used to open the schedule window.
The second button is used to play the song 「和聲beat」.
The third button is used to pause the current playing song, if any.
In other location, the contents inside Event.js will be displayed.
The right component consists of 3 parts:
1. Statistics bar
2. Normal buttons
3. Admin Only buttons
Statistics bar corresponds to the contents inside displayStat.js.
For the normal buttons, the corresponding pop up windows will be displayed when the
button is clicked and the background is dimmed.
The admin only buttons are only visible by administrator. 
This component serves as a bridge between many different components.
Many other components make use of functions in main.js.
Whenever there is statistics update, the data must pass through main.js and is directed
to other files for further process.
Last update: 29/4/2022 by Ku Nok Tik
****************************************************************************************/

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
import friend_img from '../backend/img/friends_boys.png'
import profile_img from '../backend/img/profile.png'

import Event from './Event';
import StatDisplay from './statDisplay';
import ShowUsers from './AdminFunction/ShowUsers.js';
import Setting from './Main_button_component/setting';

import wooSingBeat from "../backend/music/WooSingBeat.mp3"
import Exam from './Main_button_component/exam.js';


class Main extends React.Component {

    constructor(props) {
        super(props);

        this.song = new Audio();

        this.state = {
            popUpBar: "",
            stat: null,
            location: "main",
            started: 0,
            overflow: 1,
        };

        this.statRef = React.createRef();           // create a reference for function trigger

        this.setStatusOff = this.setStatusOff.bind(this);
        this.userLogout = this.userLogout.bind(this);

        this.handleSchedulePlan = this.handleSchedulePlan.bind(this);
        this.checkRefreshAndUpdate = this.checkRefreshAndUpdate.bind(this);
        this.handlePopupBackground = this.handlePopupBackground.bind(this);
        this.handlePopClose = this.handlePopClose.bind(this);
        this.handleMaineventStat = this.handleMaineventStat.bind(this);
        this.handleLocation = this.handleLocation.bind(this);
        this.handleExamPop = this.handleExamPop.bind(this);
        this.popMainEvent = this.popMainEvent.bind(this);
        this.setEvent = this.setEvent.bind(this);
        this.resetData = this.resetData.bind(this);
        this.setOverflow = this.setOverflow.bind(this);
        this.updateStat = this.updateStat.bind(this);

        this.playSong = this.playSong.bind(this);
        this.pauseSong = this.pauseSong.bind(this);
    }

    resetData() {
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
        this.setState({ location: "main" });
    }

    // for disabling change of location after starting an event
    setEvent(started) {
        this.setState({ started: started });
    }

    // update statistics in both statistics bar and backend 
    updateStat(stat) {
        this.statRef.current.update(stat);          // activate update function inside statDisplay.js
        this.setState({ stat: { ...this.state.stat, ...stat } });
        statBackendUpdate(stat);
        new Promise(resolve => setTimeout(resolve, 1));

        if (stat.year === 1 && stat.sem === 0) {             // tutorial for new player
            this.setState({ popUpBar: "mainEvent" });
        }
    }

    // change left component of main to event location after confirming location in map
    handleLocation(location) {
        if (location !== "main") {
            this.updateStat({ ...this.state.stat, stamina: this.state.stat.stamina - 5 });         // decrease stamina when moving to other places
        }
        this.setState({ location: location });
    }

    handlePopupBackground(bg) {
        this.setState({ backgroundImage: bg });
    }

    popMainEvent() {
        this.setState({ popUpBar: "mainEvent" });
    }

    handleExamPop() {
        this.setState({ popUpBar: "exam" });
    }

    handlePopClose() {
        this.setState({ popUpBar: "" });
    }

    statUpdateFromBackend(ID) {
        statRetrievebyId(ID)
            .then((res) => {
                this.updateStat(res);
            });
    }

    playSong(name) {
        console.log(name);
        this.song.src = name;
        this.song.autoplay = true;
        this.song.loop = true;
        if (name === wooSingBeat) this.song.volume = 0.20;
        if (name === "/static/media/WiiShop.db811a7c77479ff0dced.mp3") this.song.volume = 0.25;
        if (name === "/static/media/ClassroomNoise.e849e792a91a52c8f917.mp3") this.song.volume = 0.25;
        this.song.play();
    }

    pauseSong() {
        if (this.song.paused) return;
        else this.song.pause();
    }

    muteSong() {
        (this.song.muted) ? this.song.muted = false : this.song.muted = true;
    }

    componentDidMount() {
        this.checkRefreshAndUpdate();
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            return ev.returnValue;
        });
    }

    componentWillUnmount() {
        this.pauseSong();
    }

    async checkRefreshAndUpdate() {
        if (window.sessionStorage.getItem("isLoggedIn")) {
            await this.props.handleSessionRefresh();
        }
        this.statUpdateFromBackend(this.props.userId);
    }

    setOverflow(val) {
        this.setState({ overflow: val });
    }

    // corresponding pop up windows
    popUp(option) {
        if (option === "profile") {
            require("./Main_button_component/profile.css");
            return (
                <div className="mainPopUp">
                    <div id="shadowLayer" />
                    <button className="closeButton" onClick={() => { this.setState({ popUpBar: "" }) }}>x</button>
                    <div className="popUp" style={{ overflow: this.state.overflow ? "auto" : "clip" }}>
                        <Profile
                            stat={this.state.stat}
                            displayName={this.props.displayName}
                            handleDisplayName={this.props.handleDisplayName}
                            aboutMe={this.props.aboutMe}
                            handleAboutMe={this.props.handleAboutMe}
                            username={this.props.username}
                            friend={false}
                            setOverflow={this.setOverflow}
                        />
                    </div>
                </div>

            )
        }

        if (option === "map") {
            return (
                <div className="mainPopUp">
                    <div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => { this.setState({ popUpBar: "" }) }}>x</button>
                    <div className="popUp">
                        <Map
                            handleLocation={this.handleLocation}
                            handlePopClose={this.handlePopClose}
                            available={!this.state.started}
                            stamina={this.state.stat.stamina}
                        />
                    </div>
                </div>
            )
        }
        if (option === "logout") {
            return (
                <div className="mainPopUp">
                    <div id="shadowLayer"></div>
                    <div className="popUp" id="logout">
                        <h4>Are you sure to log out?</h4>
                        <br></br>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-light" onClick={this.userLogout}>Yes</button>
                            <button className="btn btn-light" onClick={() => { this.setState({ popUpBar: "" }) }}>No</button>
                        </div>
                    </div>
                </div>
            )
        }

        if (option === "schedule") {
            return (
                <div className="mainPopUp">
                    <div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => { this.setState({ popUpBar: "" }) }}>x</button>
                    <div className="popUp" style={{ overflow: this.state.overflow ? "auto" : "clip" }}>
                        <Schedule
                            popMainEvent={this.popMainEvent}
                            handleSchedulePlan={this.handleSchedulePlan}
                            setOverflow={this.setOverflow}
                        />
                    </div>
                </div>
            )
        }

        if (option === "mainEvent") {
            return (
                <div className="mainPopUp">
                    <div id="shadowLayer"></div>
                    <div className="popUp">
                        <MainEvent
                            handlePopupBackground={this.handlePopupBackground}
                            resetData={this.resetData}
                            stat={this.state.stat}
                            handleMaineventStat={this.handleMaineventStat}
                            handlePopClose={this.handlePopClose}
                            handleExamPop={this.handleExamPop}
                            playSong={this.playSong}
                            pauseSong={this.pauseSong}
                        />
                    </div>
                </div>
            )
        }

        if (option === "friend") {
            return (
                <div className="mainPopUp">
                    <div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => { this.setState({ popUpBar: "" }) }}>x</button>
                    <div className="popUp" style={{ overflow: this.state.overflow ? "auto" : "clip" }}>
                        <FriendList
                            stat={this.state.stat}
                            setOverflow={this.setOverflow}
                            updateStat={this.updateStat}
                        />
                    </div>
                </div>
            )
        }

        if (option === "setting") {
            return (
                <div className="mainPopUp">
                    <div id="shadowLayer"></div>
                    <div className="popUp">
                        <Setting resetData={this.resetData} id={this.state.stat.user} setOverflow={this.setOverflow} handlePopClose={this.handlePopClose} year={this.state.stat.year} />
                    </div>
                </div>
            )
        }

        if (option === "setStat") {
            return (
                <div className="mainPopUp">
                    <div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => { this.setState({ popUpBar: "" }) }}>x</button>
                    <div className="popUp" id="setStat">
                        <h2><center>Set statistics</center></h2>
                        <br></br>

                        GPA:
                        <input type="text" id="GPA" name="GPA" defaultValue={this.state.stat.gpa} /><br></br>
                        Sports:
                        <input type="text" id="Sports" name="Sports" defaultValue={this.state.stat.sports} /><br></br>
                        Happiness:
                        <input type="text" id="Happiness" name="Happiness" defaultValue={this.state.stat.happiness} /><br></br>
                        Money:
                        <input type="text" id="Money" name="Money" defaultValue={this.state.stat.money} /><br></br>
                        Stamina:
                        <input type="text" id="Stamina" name="Stamina" defaultValue={this.state.stat.stamina} /><br></br>
                        Year:
                        <input type="text" id="Year" name="Year" defaultValue={this.state.stat.year} />
                        Sem:
                        <input type="text" id="Sem" name="Sem" defaultValue={this.state.stat.sem} /><br></br>
                        <br></br>

                        <button className="btn btn-light" onClick={() => {
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
                            this.setState({ popUpBar: "" });
                            this.updateStat(stat);
                        }}>Update</button>

                    </div>
                </div>
            )
        }

        if (option === "showUser") {
            return (
                <div className="mainPopUp">
                    <div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => { this.setState({ popUpBar: "" }) }}>x</button>
                    <div className="popUp" style={{ overflow: this.state.overflow ? "auto" : "clip" }}>
                        <ShowUsers setOverflow={this.setOverflow} />
                    </div>
                </div>
            )
        }

        if (option === "exam") {
            return (
                <div className="mainPopUp">
                    <div id="shadowLayer"></div>
                    <div className="popUp">
                        <Exam
                            popMainEvent={this.popMainEvent}
                            handlePopupBackground={this.handlePopupBackground}
                            resetData={this.resetData}
                            stat={this.state.stat}
                            handleMaineventStat={this.handleMaineventStat}
                            handlePopClose={this.handlePopClose}

                            playSong={this.playSong}
                            pauseSong={this.pauseSong}
                        />
                    </div>
                </div>
            )
        }

        return;
    }

    // left side of main page, can be changed to different locations according to this.state.location
    leftComponent() {
        if (this.state.location === "main") {
            return (
                <div className="split left" style={{ backgroundImage: `url(${main_bg})` }} id="defaultPage">
                    <h2>{`Welcome to CU Simulator, ${this.props.displayName}!`}</h2>
                    <button className="btn btn-light" onClick={() => this.setState({ popUpBar: "schedule" })} style={{ display: `${(this.state.stat && this.state.stat.year >= 5) ? "none" : ""}` }}>Open schedule</button>
                    <button className="btn btn-light" onClick={() => this.playSong(wooSingBeat)}>Dem個和聲Beat</button>
                    <button className="btn btn-light" onClick={() => this.pauseSong()}>Pause Song</button>
                </div>
            )
        }
        else {
            return (
                <div className="split left">
                    <Event
                        year={this.state.stat.year}
                        sem={this.state.stat.sem}
                        stamina={this.state.stat.stamina}
                        handleMaineventStat={this.handleMaineventStat}
                        location={this.state.location}
                        handleLocation={this.handleLocation}
                        setEvent={this.setEvent}

                        playSong={this.playSong}
                        pauseSong={this.pauseSong}
                    />
                </div>
            )
        }
    }

    // displayed only when the user is administrator
    adminOnly() {
        const isAdmin = window.sessionStorage.getItem("isAdmin");
        if (isAdmin === "true")
            return (
                <div className="d-flex flex-column">
                    <h2>Admin</h2>
                    <button className="btn btn-light" onClick={() => { this.setState({ popUpBar: "showUser" }) }}>Show user</button>
                    <button className="btn btn-light" onClick={() => { this.setState({ popUpBar: "setStat" }) }}>Set stat</button>
                </div>
            )
        else
            return;

    }

    // data from schedule is processed here
    async handleSchedulePlan(plan) {
        this.setState({ popUpBar: "" });
        await new Promise(resolve => setTimeout(resolve, 1));
        let newStat = this.state.stat;
        newStat = statScheduleUpdate(newStat, plan);        // calculate corresponding changes
        await new Promise(resolve => setTimeout(resolve, 1));
        this.updateStat(newStat);
        return;
    }

    // data from mainEvent, Event, Exam are processed here
    async handleMaineventStat(dia_line_sub, sideEvent) {
        this.setState({ popUpBar: "" });
        await new Promise(resolve => setTimeout(resolve, 1));
        let newStat = this.state.stat;
        newStat = statEventUpdate(newStat, dia_line_sub);
        if (sideEvent)
            newStat = { ...newStat, stamina: newStat.stamina - 20 };
        await new Promise(resolve => setTimeout(resolve, 1));
        this.setState({
            stat: newStat
        })
        this.updateStat(newStat);
        return;
    }

    // set user status as "off" when logout button is clicked
    async setStatusOff() {
        return fetch(process.env.REACT_APP_BASE_URL + "/logout", {
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
    }

    async userLogout() {
        this.setStatusOff()
            .then((res) => {
                this.props.handleLogout();
                this.props.navigate("../");           // redirect to login page
            })
            .catch((error) => console.log(error));
    }

    render() {
        require('./Main.css');

        // layout of the page
        return (
            <div id="main">

                <div>
                    {this.leftComponent()}
                </div>

                <div className="split right d-flex flex-column">

                    <h2>Statistics</h2>
                    <StatDisplay stat={this.state.stat} ref={this.statRef} />
                    <br></br>

                    <div onClick={() => this.setState({ popUpBar: "friend" })}>
                        <button className="btn btn-light">
                            <img id="friendImg" src={friend_img} />
                            Friend List
                        </button>
                    </div>
                    <div onClick={() => this.setState({ popUpBar: "profile" })}>
                        <button className="btn btn-light">
                            <img id="profileImg" src={profile_img} />
                            Check profile
                        </button>
                    </div>
                    <button className="btn btn-light" onClick={() => this.setState({ popUpBar: "map" })}>Explore CUHK!</button>
                    <button className="btn btn-light" onClick={() => this.setState({ popUpBar: "setting" })}>Settings</button>
                    <button className="btn btn-light" onClick={() => this.setState({ popUpBar: "logout" })}>Logout</button>
                    <br></br>
                    {this.adminOnly()}
                </div>

                {this.popUp(this.state.popUpBar)}

            </div>

        )
    }
}

export default withRouter(Main);

