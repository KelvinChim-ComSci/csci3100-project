import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import GateOfWisdom from './EventScript/GateOfWisdom.txt';
import HoChou from './EventScript/HoChou.txt';
import LakeAdExcellentiam from './EventScript/LakeAdExcellentiam.txt';
import HaddonCave from './EventScript/HaddonCave.txt';
import MedCan from './EventScript/MedCan.txt';
import SwimmingPool from './EventScript/SwimmingPool.txt';
import ThreeBrothers from './EventScript/ThreeBrothers.txt';
import UC from './EventScript/UC.txt';
import NA from './EventScript/NA.txt';
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
import uc_bg from '../backend/background/uc.jpg'
import unimall_bg from '../backend/background/unimall.jpeg'
import medcan_bg from '../backend/background/medcan.jpg'
import swimmingpool_bg from '../backend/background/swimmingpool.png'
import cclib_bg from '../backend/background/cclib.jpg'
import hochou_bg from '../backend/background/hochou.png'
import threebrother_bg from '../backend/background/threebrother.jpg'

import NoEvent from '../backend/music/NoEvent.mp3';
import TrollSong from '../backend/music/TrollSong.mp3';
import CUHKSound from '../backend/music/CUHK_Soundscape.mp3';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.mounted = false;
        this.currentTimeout = null;
        this.handleClick = this.handleClick.bind(this);
        this.handleChoice = this.handleChoice.bind(this);
        this.bgchoice = this.bgchoice.bind(this);
        this.beginEvent = this.beginEvent.bind(this);
        this.returnToMain = this.returnToMain.bind(this);
        this.eventChoice = this.eventChoice.bind(this);

        this.state = {
            script_count: 0,
            popUpChoice: "",
            chosenChoice: -1,
            started: 0,
            pop_q: "",
            noEvent: false,
            lineFinished: false,
        }
    }

    componentDidMount(){
        this.mounted = true;
    }

    componentWillUnmount() {
        this.props.pauseSong();
        this.mounted = false;
        clearTimeout(this.currentTimeout);
    }

    eventChoice(location, year, sem){
        if (location === "U Lib" && year === 1 && sem === 1) {
            this.props.playSong(TrollSong);
            return GateOfWisdom;
        }
        if (location === "UC" && year === 1 && sem === 2) {
            this.props.playSong(CUHKSound);
            return UC;
        }
        if (location === "NA" && year === 1 && sem === 3) {
            this.props.playSong(CUHKSound);
            return NA; 
        }
        if (location === "Haddon-Cave" && year === 1 && sem === 4) {
            this.props.playSong(TrollSong);
            return HaddonCave;
        }
        if (location === "Weiyuan Lake" && year === 2 && sem === 1) {
            return LakeAdExcellentiam;
        }
        if (location === "CC HoCou" && year === 2 && sem === 2) {
            return HoChou;
        }
        if (location === "The three brothers" && year === 2 && sem === 3) {
            return ThreeBrothers;
        }
        if (location === "University Station" && year === 3 && sem === 1) {
            return UniverityStation;
        }
        if (location === "The University Mall" && year === 3 && sem === 2) {
            return UniversityMall;
        }
        if (location === "MedCan" && year === 4 && sem === 1) {
            return MedCan;
        }
        if (location === "CC Lib" && year === 4 && sem === 2) {
            return CCLib;
        }
        if (location === "Swimming Pool" && year === 4 && sem === 3) {
            return SwimmingPool;
        }

        this.props.playSong(NoEvent);
        this.setState({noEvent: true});
        return noEvent;
    }



    beginEvent(){
        if (this.props.stamina < 20){
            alert("You are already tired. Please go home and rest more!");
            return;
        }

        fetch(this.eventChoice(this.props.location, this.props.year, this.props.sem))
        .then(r => r.text())
        .then(text => {
            this.script_list = text.split('\n');
            this.displayDialogue(this.script_list[0], 0, false);
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
        })
        .then(this.setState({started: 1}))
        .then(this.props.setEvent(1));
    }

    bgchoice(location){
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
        if (location === "CC HoCou") return hochou_bg;
        if (location === "The three brothers") return threebrother_bg;

    }

    returnToMain(){
        this.props.setEvent(0);
        this.props.handleLocation("main");
    }

    handleClick() {

        let dia_line = this.script_list[this.state.script_count];
        let dialogue = dia_line;
        let pop_q = false;

        // end event if # is detected
        if (this.state.lineFinished && dia_line[0] === "#") {
            this.props.handleMaineventStat(dia_line.substring(1).split(','), !this.state.noEvent);
            this.returnToMain();
        }

        // if this is a @ line
        if (dia_line[0] === "@"){
            dialogue = dia_line.substring(4);
            // pop choice window if @Q is detected while reading script
            if (dia_line[1] === "Q")
                pop_q = true;
        }

        
        if (this.state.lineFinished) {
            this.setState({lineFinished: false});
            this.displayDialogue(dialogue, 0, pop_q);
        }
        else {
            clearTimeout(this.currentTimeout);
            this.displayDialogue(dialogue, dialogue.length, pop_q);
        }
        
    } 

    displayDialogue(dialogue, i, pop_q){
        let part = dialogue.substr(0, i);
        if (document.getElementById('dialogue') && this.mounted)
            document.getElementById('dialogue').innerHTML = part;

        if (i < dialogue.length){
            this.currentTimeout = setTimeout(() => {this.displayDialogue(dialogue, i+1, pop_q)}, 10);
        }
            
        else {
            this.setState({lineFinished: true, script_count: this.state.script_count+1});
            if (pop_q){
                this.setState({
                    popUpChoice : "choice",
                    pop_q: dialogue,
                });
            }
        }  
    }

    async handleChoice(choiceId) {
        this.setState({
            popUpChoice: "",
            chosenChoice: choiceId,
            script_count: this.state.script_count + parseInt(this.script_reaction_count[choiceId - 1]),
        });
        await new Promise(resolve => setTimeout(resolve, 1));
        // console.log("choice Id", this.state.chosenChoice, "script_count", this.state.script_count);
        this.handleClick();
    }
      
    dialogueWindow() {
        if (this.state.started)
            return (
                <div>
                    <div className="text" onClick={()=>this.handleClick()}>
                        <p id = "dialogue"></p>
                    </div>
                </div>

            )
        else
            return (
                <div>
                    <div>
                        <div onClick={this.returnToMain} className="textContainer topRight" >
                            Back to main page
                        </div>
                    </div>
                    <button onClick={this.beginEvent} id="eventStarter" className="btn btn-success eventStarter">
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
        require('./Event.css');

        return (
            <div className = 'event' style={{backgroundImage: `url(${this.bgchoice(this.props.location)})`}}>
                <div className = "textContainer topLeft"><h1 id='Location'>{this.props.location}</h1></div>
                {this.dialogueWindow()}
                {this.popUp(this.state.popUpChoice)}      
            </div>
        )
    }
}

export default withRouter(Event);




