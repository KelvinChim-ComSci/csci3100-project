import React from "react";
import "./choiceWindow.css";

function displayChoice(props) {
    const choiceItems = props.script_answer.map((item, index)=> <button key={item} onClick={()=>props.handleChoice(index + 1)}>{item}</button>);
    return (
        <div>
            {choiceItems}
        </div>
    )
}

export default displayChoice;
