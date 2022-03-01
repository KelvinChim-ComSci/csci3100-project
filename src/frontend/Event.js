import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Event.css';
import dia from './EventScript/GateOfWisdom.txt';
import { Button } from 'bootstrap';
import { withRouter } from './withRouter.js';
import Choice from './choiceWindow';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChoice = this.handleChoice.bind(this);
        this.returnToMain = this.returnToMain.bind(this);

        fetch(dia)
        .then(r => r.text())
        .then(text => {
          this.script_list = text.split('\n');
          document.getElementById('dialogue').innerHTML = this.script_list[0];
          this.script_answer = [];
          this.script_reaction_count = [];
        //   this.script_reaction = [];
          for (let k = 0; k < this.script_list.length; k++){
              if (this.script_list[k][0]==="@" && this.script_list[k][1]==="A") {
                  this.script_answer.push(this.script_list[k].substring(6));
                  this.script_reaction_count.push(this.script_list[k][4]);
                //   this.script_reaction.push(this.script_list[k+1]);
              }
          }
          console.log("script_reaction_count", this.script_reaction_count);
        });

        this.state = {
            script_count : 1,
            popUpChoice : "",
            chosenChoice: -1,
        }
        
    }

    returnToMain() {
        this.props.navigate('../main');
    }

    handleClick() {
        console.log("script line #", this.state.script_count);
        var dia_line = this.script_list[this.state.script_count];
        console.log("string:", dia_line);

        // end event if # is detected
        if (dia_line[0] === "#"){
            console.log("")
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
            console.log("pop choice");
            this.setState({
                popUpChoice : "choice",
                script_count: this.state.script_count + 1
            });
            return;
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
                        <Choice script_answer={this.script_answer} handleChoice={this.handleChoice} />
                    </div>
                </div>
                )
        else{
            return
        }
    }

    render() {
      
        return (
            <div id = "event">
                <div className = "container topLeft"><h1  id='Location'>LOCATION</h1></div>
                <div><a onClick={this.returnToMain} className="container topRight" >Back to main page</a></div>
                <div className="text" onClick={()=>this.handleClick()}>
                    <p id = "dialogue"> ??? </p>
                    <svg className="corner" viewBox="0 0 88 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M35 3.5L65 6.5V62L0 0L35 3.5Z" fill="white"/>
                    </svg>
                </div>
                {this.popUp(this.state.popUpChoice)}      
            </div>
        )
    }
}

export default withRouter(Event);




