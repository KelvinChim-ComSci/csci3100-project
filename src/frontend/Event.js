import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Event.css';
import dia from './EventScript/GateOfWisdom.txt';
import { Button } from 'bootstrap';
import { withRouter } from './withRouter.js';
import Choice from './choiceWindow';
import { useRoutes } from 'react-router-dom';
import ulib_bg from '../backend/background/ULib.png'
import na_bg from '../backend/background/na.jpeg'
import unistation_bg from '../backend/background/unistation.png'
import haddoncave_bg from '../backend/background/haddoncave.png'
import weiyuanlake_bg from '../backend/background/weiyuanlake.png'
import uc_bg from '../backend/background/uc.png'
import unimall_bg from '../backend/background/unimall.png'
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

        this.state = {
            script_count : 1,
            popUpChoice : "",
            chosenChoice: -1,
        }

    }

    beginEvent(){
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

        //   console.log("script_reaction_count", this.script_reaction_count);"url("+background+")";  "url('https://cdn.xgqfrms.xyz/logo/logo.png')"

        });
    }

    bgchoice(location){
        console.log("1231231232")
        console.log(location)
        if (location == "U Lib"){return ulib_bg}
        if (location == "NA"){return na_bg}
        if (location == "University Station"){return unistation_bg}
        if (location == "Haddon-Cave"){return haddoncave_bg}
        if (location == "Weiyuan Lake"){return weiyuanlake_bg}
        if (location == "UC"){return uc_bg}
        if (location == "The University Mall"){return unimall_bg}
        if (location == "MedCan"){return medcan_bg}
        if (location == "Swimming Pool"){return swimmingpool_bg}
        if (location == "CC Lib"){return cclib_bg}

    }

    returnToMain(){
        console.log("clicked return to main");
        this.props.handleLocation("main");
    }

    handleClick() {
        // console.log("script line #", this.state.script_count);
        var dia_line = this.script_list[this.state.script_count];
        // console.log("string:", dia_line);

        // end event if # is detected
        if (dia_line[0] === "#"){
            // console.log("")
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
        // console.log("choice Id", this.state.chosenChoice, "script_count", this.state.script_count);
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
        console.log(this.props.params);

        return (
            <div className = 'event' style={{backgroundImage: `url(${this.bgchoice(this.props.location)})`}}>
                <button onClick={this.beginEvent}>Click to start</button>
                <div className = "container topLeft"><h1 id='Location'>{this.props.location}</h1></div>
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




