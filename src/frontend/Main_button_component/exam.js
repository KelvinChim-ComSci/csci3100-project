/**************************************************************************************** 
This component is activated after clicking the if there are exam after the mainEvent.
Users chooses answer of questions, which are multiple choice questions read from script in ../EventScript.
The data is then passed back to main.js for further process of the data.
The current pop up window will be closed and return the user to page of main.js.
Last Updated: 29/4/2022 by Ho Cheuk Hin.
****************************************************************************************/

import React from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Choice from '../choiceWindow';

import mainBg from '../../backend/background/mainEvent.jpg';
import exam1 from "../EventScript/exam1.txt";
import exam1b from "../EventScript/exam1b.txt";
import exam2 from "../EventScript/exam2.txt";
import exam2b from "../EventScript/exam2b.txt";
import exam3 from "../EventScript/exam3.txt";
import exam3b from "../EventScript/exam3b.txt";
import exam4 from "../EventScript/exam4.txt";
import exam4b from "../EventScript/exam4b.txt";

class Exam extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChoice = this.handleChoice.bind(this);
        this.returnToMain = this.returnToMain.bind(this);
        
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
            for (let k = 0; k < this.script_list.length; k++){
                if (this.script_list[k][0]==="@" && this.script_list[k][1]==="A") {
                    this.script_answer.push(this.script_list[k].substring(6));
                    this.script_reaction_count.push(this.script_list[k][4]);
                    if (this.script_list[k][5] !== "@"){
                        this.script_reaction_count.pop()
                        this.script_reaction_count.push(parseInt(this.script_list[k][4]*10) + parseInt(this.script_list[k][5]))
                        this.script_answer.pop();
                        this.script_answer.push(this.script_list[k].substring(7));
                    }
                }
                if (this.script_list[k][0]==="="){
                    this.correct_answer.push(parseInt(this.script_list[k][1]))
                }
            }
        });
    }

    eventChoice(year, sem, stat) {

        // since the event pops up after the schdules end, the time in the story should -1 sem in here
        if (year === 2 && sem === 1) {
            if (stat.gpa > 20){
            return exam1
            }
            else return exam1b
        }

        if (year === 3 && sem === 1) {
            if (stat.gpa > 30){
            return exam2
            }
            else return exam2b
        }

        if (year === 4 && sem === 1) {
            if (stat.gpa > 50){
            return exam3
            }
            else return exam3b
        }

        if (year === 5 && sem === 1) {
            if (stat.gpa > 60){
            return exam4
            }
            else return exam4b
        }


    }

    handleClick() {
        let dia_line = this.script_list[this.state.script_count];
        let dialogue = dia_line;
        let pop_q = false;

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
            toast.success("You have answered "+this.state.correct_count+" number of questions correctly!");
            if (this.props.stat.year === 5)
                this.props.popMainEvent();
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
        await new Promise(resolve => setTimeout(resolve, 1));
        if (this.correct_answer[this.state.question_count] === this.state.chosenChoice){
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
