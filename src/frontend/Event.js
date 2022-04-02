import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import GateOfWisdom from './EventScript/GateOfWisdom.txt';
import HoChou from './EventScript/HoChou.txt';
import LakeAdExcellentiam from './EventScript/LakeAdExcellentiam.txt';
import MedCan from './EventScript/MedCan.txt';
import SwimmingPool from './EventScript/SwimmingPool.txt';
import ThreeBrothers from './EventScript/ThreeBrothers.txt';
import UC from './EventScript/UC.txt';
import UniversityMall from './EventScript/UniversityMall.txt';
import UniverityStation from './EventScript/UniversityStation.txt';
import CCLib from './EventScript/CCLib.txt'
import noEvent from './EventScript/noEvent.txt';
import { withRouter } from './withRouter.js';
import Choice from './choiceWindow';
import ulib_bg from '../backend/background/ULib.png'
import na_bg from '../backend/background/na.jpeg'
import unistation_bg from '../backend/background/unistation.png'
import haddoncave_bg from '../backend/background/haddoncave.jpg'
import weiyuanlake_bg from '../backend/background/weiyuanlake.png'
import uc_bg from '../backend/background/uc.jpeg'
import unimall_bg from '../backend/background/unimall.jpeg'
import medcan_bg from '../backend/background/medcan.png'
import swimmingpool_bg from '../backend/background/swimmingpool.png'
import cclib_bg from '../backend/background/cclib.png'

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChoice = this.handleChoice.bind(this);
        this.bgchoice = this.bgchoice.bind(this);
        this.beginEvent = this.beginEvent.bind(this);
        this.returnToMain = this.returnToMain.bind(this);
        this.eventChoice = eventChoice.bind(this);

        function eventChoice(location, year, sem){
            if (location === "U Lib" && year === 1 && sem === 1)
                return GateOfWisdom;
            if (location === "UC" && year === 1 && sem === 2)
                return UC;
            if (location === "NA")
                return noEvent; // to be implemented
            if (location === "University Station" && year === 3 && sem === 1)
                return UniverityStation;
            if (location === "Haddon-Cave")
                return noEvent; // to be implemented
            if (location === "Weiyuan Lake" && year === 2 && sem === 1)
                return LakeAdExcellentiam;
            if (location === "The University Mall" && year === 3 && sem === 1)
                return UniversityMall;
            if (location === "MedCan" && year === 4 && sem === 1)
                return MedCan;
            if (location === "CC Lib" && year === 4 && sem === 2)
                return CCLib;
            if (location === "Swimming Pool" && year === 4 && sem === 3)
                return SwimmingPool;
            else
                return noEvent;

        }

        this.state = {
            script_count: 1,
            popUpChoice: "",
            chosenChoice: -1,
            started: 0,
            pop_q: "",
        }

    }

    beginEvent(){
        fetch(this.eventChoice(this.props.location, this.props.year, this.props.sem))
        .then(r => r.text())
        .then(text => {
            this.script_list = text.split('\n');
            document.getElementById('dialogue').innerHTML = this.script_list[0];
            this.script_answer = [];
            this.script_reaction_count = [];
            //   this.script_reaction = [];
            for (let k = 0; k < this.script_list.length; k++){
                if (this.script_list[k][0] === "@" && this.script_list[k][1] === "A") {

                    this.script_answer.push(this.script_list[k].substring(6));
                    this.script_reaction_count.push(this.script_list[k][4]);

                    if (this.script_list[k][5] !== "@"){

                        this.script_reaction_count.pop();
                        this.script_reaction_count.push(parseInt(this.script_list[k][4]*10) + parseInt(this.script_list[k][5]));
                        this.script_answer.pop();
                        this.script_answer.push(this.script_list[k].substring(7));
                    }
                    //   this.script_reaction.push(this.script_list[k+1]);
                }
            }
            console.log("script_reaction_count", this.script_reaction_count);
        })
        .then(this.setState({started: 1}))
        .then(this.props.setEvent(1));
    }

    bgchoice(location){
        console.log(location)
        if (location === "U Lib") return ulib_bg;
        if (location === "NA") return na_bg;
        if (location === "University Station") return unistation_bg;
        if (location === "Haddon-Cave") return haddoncave_bg;
        if (location === "Weiyuan Lake") return weiyuanlake_bg;
        if (location === "UC") return uc_bg;
        if (location === "The University Mall") return unimall_bg;
        if (location === "MedCan") return medcan_bg;
        if (location === "Swimming Pool") return swimmingpool_bg;
        if (location === "CC Lib") return cclib_bg;
    }

    returnToMain(){
        console.log("clicked return to main");
        this.props.setEvent(0);
        this.props.handleLocation("main");
    }

    handleClick() {
        // console.log("script line #", this.state.script_count);
        var dia_line = this.script_list[this.state.script_count];
        // console.log("string:", dia_line);

        // end event if # is detected
        if (dia_line[0] === "#"){
            // console.log("")
            this.props.handleMaineventStat(dia_line.substring(1).split(','));
            this.returnToMain();
        }

        // normal line without @
        if (dia_line[0] !== "@"){
            document.getElementById('dialogue').innerHTML = dia_line;
            this.setState({script_count: this.state.script_count + 1});
            return;
        }

        // if this is a @ line and not @Q
        if (dia_line[0] === "@" && dia_line[1] !== "Q"){
            document.getElementById('dialogue').innerHTML = dia_line.substring(4);
            this.setState({script_count: this.state.script_count + 1});
            return;
        }

        // pop choice window if @Q is detected while reading script
        if (dia_line[0] === "@" && dia_line[1] === "Q"){
            dia_line = dia_line.substring(4);
            document.getElementById('dialogue').innerHTML = dia_line;
            // console.log("pop choice");
            this.setState({
                popUpChoice : "choice",
                script_count: this.state.script_count + 1,
                pop_q: dia_line,
            });
            return;
        }
    } 

    async handleChoice(choiceId) {
        this.setState({
            popUpChoice: "",
            chosenChoice: choiceId,
            script_count: this.state.script_count + parseInt(this.script_reaction_count[choiceId - 1])
        });
        await new Promise(resolve => setTimeout(resolve, 1));
        // console.log("choice Id", this.state.chosenChoice, "script_count", this.state.script_count);
        this.handleClick();
    }
      
    dialogueWindow() {
        if (this.state.started)
            return (
                <div className="text" onClick={()=>this.handleClick()}>
                    <p id = "dialogue"></p>
                    <svg className="corner" viewBox="0 0 88 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M35 3.5L65 6.5V62L0 0L35 3.5Z" fill="white"/>
                    </svg>
                </div>
            )
        else
            return (
                <div>
                    <div>
                        <div onClick={this.returnToMain} className="container topRight" >
                            Back to main page
                        </div>
                    </div>
                    <button onClick={this.beginEvent} id="eventStarter" className="eventStarter">
                        Click to start
                    </button>
                </div>
            );
    }



    // choiceList(){
    //     this.script_answer.map(function(answer){
    //         return (
    //             <div>
    //                 <button> </button>
    //             </div>
    //         )
    //     }
    // }

    popUp(option) {
        if (option === "choice")
            return (
                <div>
                    <div id="shadowLayer"></div>
                    <div className="popUp" id = "choiceWindow">
                        <Choice pop_q = {this.state.pop_q} script_answer={this.script_answer} handleChoice={this.handleChoice} />
                    </div>
                </div>
                )
        else{
            return
        }
    }

    render() {
        console.log(this.props.params);
        require('./Event.css');

        return (
            <div className = 'event' style={{backgroundImage: `url(${this.bgchoice(this.props.location)})`}}>
                <div className = "container topLeft"><h1 id='Location'>{this.props.location}</h1></div>
                {this.dialogueWindow()}
                {this.popUp(this.state.popUpChoice)}      
            </div>
        )
    }
}

export default withRouter(Event);




