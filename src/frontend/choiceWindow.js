import React from "react";
import "./choiceWindow.css";

class Choice extends React.Component {

    render(){
        const choiceItems = this.props.script_answer.map((item, index) =>
            <button key={item} onClick={()=>this.props.handleChoice(index + 1)}>
                {item}
            </button>
        );
        
        return (
            <div>
                {choiceItems}
            </div>
        )
    }
}

export default Choice;
