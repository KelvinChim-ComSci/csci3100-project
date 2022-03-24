import React from "react";
import "./mainEvent.css";
import event1 from "../EventScript/event1.txt"
import event2 from "../EventScript/event2.txt"
import event3 from "../EventScript/event3.txt"
import event4 from "../EventScript/event4.txt"
import event5 from "../EventScript/event5.txt"
import event6 from "../EventScript/event6.txt"
import event7 from "../EventScript/event7.txt"
import event8 from "../EventScript/event8.txt"
import event9 from "../EventScript/event9.txt"
import event10 from "../EventScript/event10.txt"
import event11 from "../EventScript/event11.txt"
import event12 from "../EventScript/event12.txt"
import event13 from "../EventScript/event13.txt"
import event14 from "../EventScript/event14.txt"
import event15 from "../EventScript/event15.txt"
import event16 from "../EventScript/event16.txt"
import event17 from "../EventScript/event17.txt"
import event18 from "../EventScript/event18.txt"
import event19 from "../EventScript/event19.txt"
import event20 from "../EventScript/event20.txt"
import event21 from "../EventScript/event21.txt"
import event22 from "../EventScript/event22.txt"
import event23 from "../EventScript/event23.txt"
import event24 from "../EventScript/event24.txt"
import event25 from "../EventScript/event24.txt"



import Choice from '../choiceWindow';
class MainEvent extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChoice = this.handleChoice.bind(this);
        this.returnToMain = this.returnToMain.bind(this);


        function eventChoice(year,sem){
            // since the event pops up after the schdules end, the time in the story should -1 sem in here
            if (year == 1 && sem == 1){console.log(this.props.stat); return  event2}   
            if (year == 1 && sem == 2){return event3}
            if (year == 1 && sem == 3){return event20}
            if (year == 1 && sem == 4){
                let highest = Math.max(this.props.stat.gpa, this.props.stat.sports, this.props.stat.happiness, this.props.stat.money);
                if (this.props.stat.sports == highest){return event4}
                if (this.props.stat.gpa == highest) {return event5}
                if (this.props.stat.happiness == highest) {return event6}
                if (this.props.stat.money == highest) {return event8}
            }
            if (year == 2 && sem == 1){return event7}
            if (year == 2 && sem == 2){return event9}
            if (year == 2 && sem == 3){
                if (this.props.stat.sports > 10){
                    return event10
                }
                if (this.props.stat.money > 10){
                    return event19
                }
                if (this.props.stat.gpa > 10){
                    return event25
                }
                if (this.props.stat.happiness > 10){
                    return event18
                }

            }
            if (year == 2 && sem == 4){return event11}
            if (year == 3 && sem == 1){return event12}
            if (year == 3 && sem == 2){return event13}
            if (year == 3 && sem == 3){return event14}
            if (year == 3 && sem == 4){return event15}
            if (year == 4 && sem == 1){
                console.log("year 4 sem 1")
                if (this.props.stat.sports > 20){
                    return event24
                }
                if (this.props.stat.money > 20){
                    return event23
                }
                if (this.props.stat.gpa > 20){
                    return event21
                }
                if (this.props.stat.happiness > 20){
                    return event22
                }
            }
            if (year == 4 && sem == 2){console.log("year 4 sem 2"); return event16}
            if (year == 4 && sem == 3){return event17}
            if (year == 4 && sem == 4){
                //handle endings, to be implemented
            }
        }

        fetch(eventChoice(this.props.stat.year, this.props.stat.sem))
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
                  if (this.script_list[k][5]!="@"){
                      this.script_reaction_count.pop()
                      this.script_reaction_count.push(parseInt(this.script_list[k][4]*10) + parseInt(this.script_list[k][5]))
                      this.script_answer.pop();
                      this.script_answer.push(this.script_list[k].substring(7));
                  }
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
        this.props.handlePopClose();
    }

    handleClick() {
        console.log("script line #", this.state.script_count);
        var dia_line = this.script_list[this.state.script_count];
        console.log("string:", dia_line);

        // end event if # is detected
        if (dia_line[0] === "#"){
            console.log("")
            // handle stat change
            
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

    popUp(option) {
        if (option === "choice")
            return (
                <div className="mainEventPopUp">
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
    render(){
        return (
            <div id = "text">
                <div className="text" onClick={()=>this.handleClick()}>
                    <p id = "dialogue"> ??? </p>
                </div>
                {this.popUp(this.state.popUpChoice)}      
            </div>
        )
    }
}

export default MainEvent;