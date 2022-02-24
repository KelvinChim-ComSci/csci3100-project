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
        this.state = { schedulePop : false, scheduleOpenText: "Open schedule"};
        this.addStat = this.addStat.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

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
                document.getElementById("_id").innerText = res._id;
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

    render() {
        return (
            <div id="main">
                <p> Welcome to CU Simulator! </p>
                <div className="d-flex justify-content-center">
                <button className="btn btn-success" onClick={this.popFriendLlist}>Friend List</button>
                <button className="btn btn-success" onClick={this.popCheckStatus}>Check status</button>
                <button className="btn btn-success" onClick={this.popSchdule}>{this.state.scheduleOpenText}</button>
                <button className="btn btn-success" onClick={this.popMessageBox}> Message box </button>
                </div>

                <div className='container-fluid'>
                <div className = "row">
                <section id="statusList" className = "col-sm-3 col-lg-3 col-xl-3">
                    {/* <table className="statchild" > */}
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
                            <td id="Stamina">?</td>
                        </tr>
                    </tbody>
                    </table>
                </section>

                <section id = "schedule" className="col-sm-6 col-lg-6 col-xl-6" > 
                <PopSchdule trigger = {this.state.schedulePop} close_handler = {this.closeSchedule.bind(this)}>
                    <h1 className = "text-center text-white"> Schedule</h1>
                    <h2 className='text-center text-white'> Click on activities to plan your Ulife!</h2>
                    <ul className="list-group">
                    <li className="list-group-item list-group-item-action" onClick={()=>this.addStat("gpa")}>Study</li>
                    <li className="list-group-item list-group-item-action" onClick={()=>this.addStat("money")}>Part time</li>
                    <li className="list-group-item list-group-item-action" onClick={()=>this.addStat("sports")}>Gym</li>
                    <li className="list-group-item list-group-item-action" onClick={()=>this.addStat("happiness")}>Hang out with friends</li>
                    <li className="list-group-item list-group-item-action">Rest</li>
                    <a href="./Event" className="list-group-item list-group-item-action" >Explore CUHK! </a>
                    </ul>
                </PopSchdule>
                </section>

                <section id="friendList" className = "col-sm-3 col-lg-3 col-xl-3">
                        <h2>Friends</h2>
                </section>
                </div> {/* row */}
                </div> {/* container-fluid */}
            
                <div className = "statBottomRight bg-success text-white rounded text-center"> Year x sem y </div>

            </div> 
        )
    }
}

export default Main;