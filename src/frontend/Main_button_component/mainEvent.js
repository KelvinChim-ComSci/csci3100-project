import React from "react";
import event1 from "../EventScript/event1.txt";
import event2 from "../EventScript/event2.txt";
import event3 from "../EventScript/event3.txt";
import event4 from "../EventScript/event4.txt";
import event5 from "../EventScript/event5.txt";
import event6 from "../EventScript/event6.txt";
import event7 from "../EventScript/event7.txt";
import event8 from "../EventScript/event8.txt";
import event9 from "../EventScript/event9.txt";
import event10 from "../EventScript/event10.txt";
import event11 from "../EventScript/event11.txt";
import event12 from "../EventScript/event12.txt";
import event13 from "../EventScript/event13.txt";
import event14 from "../EventScript/event14.txt";
import event15 from "../EventScript/event15.txt";
import event16 from "../EventScript/event16.txt";
import event17 from "../EventScript/event17.txt";
import event18 from "../EventScript/event18.txt";
import event19 from "../EventScript/event19.txt";
import event20 from "../EventScript/event20.txt";
import event21 from "../EventScript/event21.txt";
import event22 from "../EventScript/event22.txt";
import event23 from "../EventScript/event23.txt";
import event24 from "../EventScript/event24.txt";
import event25 from "../EventScript/event25.txt";
import event26 from "../EventScript/event26.txt";
import event27 from "../EventScript/event27.txt";

import Choice from '../choiceWindow';
import SportEnding from "../EventScript/SportEnding.txt"
import StudyEnding from "../EventScript/StudyEnding.txt"
import MoneyEnding from "../EventScript/MoneyEnding.txt"
import HappinessEnding from "../EventScript/HappinessEnding.txt"
import NullEnding from "../EventScript/NullEnding.txt"

import mainBg from '../../backend/background/mainEvent.jpg';
import mapintro_bg from '../../backend/img/MapIntro.png';
import menuintro_bg from '../../backend/img/MenuIntro.png';
import profileintro_bg from '../../backend/img/ProfileIntro.png';
import settingintro_bg from '../../backend/img/SettingsIntro.png';
import rightstatintro_bg from '../../backend/img/RightStatIntro.png';
import friendlistintro_bg from '../../backend/img/FriendListIntro.png';
import messageintro_bg from '../../backend/img/MessageIntro.png';
import schedulentro_bg from '../../backend/img/ScheduleIntro.png';

import TrollSong from '../../backend/music/TrollSong.mp3';
import CUHKSound from '../../backend/music/CUHK_Soundscape.mp3';
import AfterSchoolWithGirl from '../../backend/music/AfterSchoolWithGirl.mp3'

class MainEvent extends React.Component {
    constructor(props) {
        super(props);
        this.mounted = false;
        this.handleClick = this.handleClick.bind(this);
        this.handleChoice = this.handleChoice.bind(this);
        this.returnToMain = this.returnToMain.bind(this);
        this.selectSong = this.selectSong.bind(this);
        //this.handlePopupBackground = this.props.handlePopupBackground;
        
        this.state = {
            script_count : 1,
            popUpChoice : "",
            chosenChoice: -1,
            pop_q: "",
            img: null,
            backgroundImage: mainBg,
        }
    }

    componentDidMount() {
        this.startEventChoice();
        this.mounted = true;
    }

    componentWillUnmount() {
        this.props.pauseSong();
        this.mounted = false;
        clearTimeout(this.currentTimeout);
    }

    returnToMain() {
        this.props.handlePopClose();
    }

    async startEventChoice() {
        fetch(this.eventChoice(this.props.stat.year, this.props.stat.sem, this.props.stat))
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
          console.log("script_reaction_count", this.script_reaction_count);
        });
    }

    eventChoice(year, sem, stat) {
        //this.handlePopupBackground(mapintro_bg);
        // since the event pops up after the schdules end, the time in the story should -1 sem in here
        
        const highest = Math.max(stat.gpa, stat.sports, stat.happiness, stat.money);
        const songNumber = [year, sem];
        this.selectSong(songNumber);
        if (year === 1 && sem === 0) {
            return event1
        }
        if (year === 1 && sem === 1) {
            return event2
        }   
        if (year === 1 && sem === 2) {
            return event3
        }
        if (year === 1 && sem === 3) {
            return event20
        }
        if (year === 1 && sem === 4){
            if (stat.sports === highest) {
                return event4
            }
            if (stat.gpa === highest) {
                return event5
            }
            if (stat.happiness === highest) {
                this.selectSong(1,1);
                return event6
            }
            if (stat.money === highest) {
                return event8
            }
        }
        if (year === 2 && sem === 1) {
            return event7
        }
        if (year === 2 && sem === 2) {
            return event9
        }
        if (year === 2 && sem === 3) {
            if (stat.sports === highest && stat.sports > 25){
                return event10
            }
            if (stat.money === highest && stat.money > 25){
                return event19
            }
            if (stat.gpa === highest && stat.gpa > 25){
                return event25
            }
            if (stat.happiness === highest && stat.happiness > 25){
                return event18
            }
            else return event26
        }
        if (year === 2 && sem === 4) {
            return event11
        }
        if (year === 3 && sem === 1) {
            return event12
        }
        if (year === 3 && sem === 2) {
            return event13
        }
        if (year === 3 && sem === 3) {
            return event14
        }
        if (year === 3 && sem === 4) {
            return event15
        }
        if (year === 4 && sem === 1) {
            console.log("year 4 sem 1")

            if (stat.sports === highest && stat.sports > 50){
                return event24
            }
            if (stat.money === highest && stat.money > 50){
                return event23
            }
            if (stat.gpa === highest && stat.gpa > 50){
                return event21
            }
            if (stat.happiness === highest && stat.happiness > 50){
                return event22
            }
            else return event27
        }
        if (year === 4 && sem === 2) {
            return event16
        }
        if (year === 4 && sem === 3) {
            return event17
        }
        if (year === 4 && sem === 4){
            if  (stat.gpa > 75 && stat.gpa === highest){
                return StudyEnding
            }
            if  (stat.happiness > 75 && stat.happiness === highest){
                return HappinessEnding
            }
            if  (stat.money > 75 && stat.money === highest){
                return MoneyEnding
            }
            if  (stat.gpa > 75 && stat.sports === highest){
                return SportEnding
            }
            else return NullEnding
        }
    }

    selectSong(year, sem) {
        const num = 4 * year + sem;
        if (num === 4 || num === 6 || num === 8 || num === 10) {
            return this.props.playSong(TrollSong);
        }
        else if (num === 13 || num === 15) {
            return this.props.playSong(CUHKSound);
        }
        else if (num === 5) {
            return this.props.playSong(AfterSchoolWithGirl);
        }
    }

    handleClick() {
        let dia_line = this.script_list[this.state.script_count];
        let dialogue = dia_line;
        let pop_q = false;

        //please do sth on this it looks so unclean
        if (this.props.stat.year === 1 && this.props.stat.sem === 0){
            switch (this.state.script_count) {
                case 15:
                    this.setState({img: schedulentro_bg});
                    break;
                case 18:
                    this.setState({img: mapintro_bg});
                    break;
                case 19:
                    this.setState({img: friendlistintro_bg});
                    break;
                case 20:
                    this.setState({img: profileintro_bg});
                    break;
                case 21:
                    this.setState({img: messageintro_bg});
                    break;
                case 22:
                    this.setState({img: rightstatintro_bg});
                    break;
                
                default:
                    this.setState({img: null});
              }
              
        }

        // end event if # is detected
        if (this.state.lineFinished && dia_line[0] === "#") {
            this.props.handleMaineventStat(dia_line.substring(1).split(','), false);
            console.log("line 264")
            console.log(this.props.stat.year)
            console.log(this.props.stat.sem)
            if (this.props.stat.year > 1 && this.props.stat.sem === 1){
                this.props.handleExamPop();
            }
            return;
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

    async displayDialogue(dialogue, i, pop_q){
        let part = dialogue.substr(0, i);
        if (document.getElementById('dialogue') && this.mounted)
            document.getElementById('dialogue').innerHTML = part;

        if (i < dialogue.length){
            this.currentTimeout = setTimeout(() => {this.displayDialogue(dialogue, i+1, pop_q)}, 10);
        }
            
        else {
            this.setState({lineFinished: true, script_count: this.state.script_count + 1});
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
            script_count: this.state.script_count + parseInt(this.script_reaction_count[choiceId - 1])
          })
        
        await new Promise(resolve => setTimeout(resolve, 1));
        console.log("choice Id", this.state.chosenChoice, "script_count", this.state.script_count);
        this.handleClick();
      }

    popUp(option) {
        if (option === "choice")
            return (
                <div className="mainEventPopUp">
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
    
    render(){
        require("./mainEvent.css");

        return (
            <div id="mainEvent" style={{backgroundImage: `url(${this.state.backgroundImage})`}}>
                <div className="imageContainer">
                    <img src={this.state.img} />
                </div>

                <div id = "text">
                    <div className="text" onClick={()=>this.handleClick()}>
                        <p id = "dialogue"></p>
                    </div>
                    {this.popUp(this.state.popUpChoice)}      
                </div>
            </div>
            
        )
    }
}

export default MainEvent;