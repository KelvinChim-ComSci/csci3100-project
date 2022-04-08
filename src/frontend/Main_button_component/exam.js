import React from "react";

import Choice from '../choiceWindow';

import mainBg from '../../backend/background/mainEvent.jpg';
import mapintro_bg from '../../backend/img/MapIntro.png';
import menuintro_bg from '../../backend/img/MenuIntro.png';
import profileintro_bg from '../../backend/img/ProfileIntro.png';
import settingintro_bg from '../../backend/img/SettingsIntro.png';
import rightstatintro_bg from '../../backend/img/RightStatIntro.png';
import friendlistintro_bg from '../../backend/img/FriendListIntro.png';
import messageintro_bg from '../../backend/img/MessageIntro.png';
import schedulentro_bg from '../../backend/img/ScheduleIntro.png';
import exam1 from "../EventScript/exam1.txt";
import event8 from "../EventScript/event7.txt";

import TrollSong from '../../backend/music/TrollSong.mp3';
import CUHKSound from '../../backend/music/CUHK_Soundscape.mp3';

class Exam extends React.Component {
    constructor(props) {
        super(props);
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
            correct_count: 0,
            question_count: 0,
        }
    }

    componentDidMount() {
        this.startEventChoice();
    }

    componentWillUnmount() {
        this.props.pauseSong();
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
          this.correct_answer = [];
        //   this.script_reaction = [];
          for (let k = 0; k < this.script_list.length; k++){
              if (this.script_list[k][0]==="@" && this.script_list[k][1]==="A") {
                  this.script_answer.push(this.script_list[k].substring(6));
                  this.script_reaction_count.push(this.script_list[k][4]);
                  if (this.script_list[k][5]!="@"){
                      this.script_reaction_count.pop()
                      this.script_reaction_count.push(parseInt(this.script_list[k][4]*10) + parseInt(this.script_list[k][5]))
                      this.script_answer.pop();
                      this.script_answer.push(this.script_list[k].substring(7));
                  }
                //   this.script_reaction.push(this.script_list[k+1]);
              }
              if (this.script_list[k][0]==="="){
                this.correct_answer.push(parseInt(this.script_list[k][1]))
            }
          }
          console.log(this.script_list)
          console.log(this.script_answer)
          console.log(this.correct_answer);
          console.log("script_reaction_count", this.script_reaction_count);
          console.log(this.state.script_count)
        });
    }

    eventChoice(year, sem, stat) {
        //this.handlePopupBackground(mapintro_bg);
        // since the event pops up after the schdules end, the time in the story should -1 sem in here
        const songNumber = 4 * year + sem;
        this.selectSong(songNumber);
        if (year === 2 && sem === 1) {
            if (stat.gpa > 10){
            return exam1
            }
            else return exam1
        }

        if (year === 3 && sem === 1) {
            return //event12
        }
        if (year === 4 && sem === 1) {
            return //event27
        }
    }

    selectSong(num) {
        if (num === 4 || num === 6 || num === 7 || num === 10) {
            return this.props.playSong(TrollSong);
        }
        else if (num === 13 || num === 15) {
            return this.props.playSong(CUHKSound);
        }
    }

    handleClick() {
        let dia_line = this.script_list[this.state.script_count];
        let dialogue = dia_line;
        let pop_q = false;

        //please do sth on this it looks so unclean
        if (this.props.stat.year === 1 && this.props.stat.sem == 0){
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
            let line = dia_line.substring(1).split(',');
            let wrong_count = this.state.question_count-this.state.correct_count;
            // should be [0,0,0,0] for all exam, change num corr. to gpa to correct counut
            if (this.state.correct_count >= wrong_count){
                line[0] = this.state.correct_count;
            }else{
                line[0] = wrong_count;
            }
            this.props.handleMaineventStat(line, false);
            alert("You have answered "+this.state.correct_count+" number of questions correctly!");
            return;
        }

        // if this is a @ line
        if (dia_line[0] === "@"){
            dialogue = dia_line.substring(4);
            // pop choice window if @Q is detected while reading script
            if (dia_line[1] === "Q")
                pop_q = true;
        }
        
        // // check if the answer is correct
        // if (dia_line[0] === "="){
        //     console.log()
        //     if (this.correct_answer[this.state.question_count] == this.state.chosenChoice){
        //         this.setState({correct_count : this.state.correct_count + 1});
        //     }
        //     // this.setState({script_count: this.state.script_count + 1});
        // }

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
        if (document.getElementById('dialogue'))
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
            script_count: this.state.script_count + parseInt(this.script_reaction_count[4*this.state.question_count + choiceId - 1])
          })
        console.log(this.script_reaction_count[4*this.state.question_count + choiceId - 1])
        await new Promise(resolve => setTimeout(resolve, 1));
        console.log("choice Id", this.state.chosenChoice, "script_count", this.state.script_count);
        if (this.correct_answer[this.state.question_count] == this.state.chosenChoice){
            this.setState({correct_count : this.state.correct_count + 1});
        }
        this.setState({question_count: this.state.question_count+1})
        this.handleClick();
      }

    popUp(option) {
        if (option === "choice")
            return (
                <div className="examPopUp">
                    <div id="shadowLayer"></div>
                    <div className="popUp" id = "choiceWindow">
                        <Choice pop_q = {this.state.pop_q} script_answer={this.script_answer.slice(4*this.state.question_count,4*this.state.question_count+4)} handleChoice={this.handleChoice} />
                    </div>
                </div>
                )
        else{
            return
        }
    }
    
    render(){
        require("./exam.css");

        return (
            <div id="exam" style={{backgroundImage: `url(${this.state.backgroundImage})`}}>
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

export default Exam;