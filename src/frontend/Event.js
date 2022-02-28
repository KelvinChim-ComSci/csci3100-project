import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Event.css';
import dia from './EventScript/GateOfWisdom.txt';
import { Button } from 'bootstrap';

class Event extends React.Component {
    

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        fetch(dia)
        .then(r => r.text())
        .then(text => {
          console.log('text decoded:', text);
          this.script_list = text.split('\n');
          document.getElementById('dialogue').innerHTML = this.script_list[0];
          this.script_answer = [];
          this.script_reaction = [];
          for (let k = 0; k < this.script_list.length; k++){
              if (this.script_list[k][0]=="@" && this.script_list[k][1]=="A") {
                  this.script_answer.push(this.script_list[k].substring(4));
                  this.script_reaction.push(this.script_list[k+1]);
              }
          }

        });
        this.state = {
            script_count : 0
        }
        
    }

    handleClick = () => {
        this.setState({script_count: this.state.script_count + 1});
        var dia_line = this.script_list[this.state.script_count];
        if (dia_line == "(End of event)"){
            window.location.href = "./Main";
        }
        if (dia_line[0]== "@" && dia_line[1] == "Q"){
            dia_line = dia_line.substring(4);
            for (let j = 0; j < this.script_answer; j++){
                let btn = document.createElement("button");
                btn.onClick = ()=>{document.getElementById('dialogue').innerHTML = this.script_reaction[j];}
                btn.innerHTML = this.script_answer[j];
                document.getElementById("Location").appendChild(btn);
            }
            this.setState({script_count: this.state.script_count + this.script_answer.length * 2});
        }
        document.getElementById('dialogue').innerHTML = dia_line;
      } 
    
    render() {
      
        return (<div id = "event">
                <div className = "container topLeft"><h1  id='Location'>LOCATION</h1></div>
                <div><a href="./Main" className="container topRight" >Back to main page</a></div>
                <div className="text" onClick={()=>this.handleClick()}>
                <p id = "dialogue"> ??? </p>
                <svg className="corner" viewBox="0 0 88 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M35 3.5L65 6.5V62L0 0L35 3.5Z" fill="white"/>
                </svg>
                </div>
        
        
        
        
                </div>
        )
    }
}

export default Event;




