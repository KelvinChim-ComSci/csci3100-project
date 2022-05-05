/**************************************************************************************** 
This component is activated when the user have to choose an option in the event or side
event. It will pop up a new window and provide different options for users to choose.

Last updated: 5/5/2022 by Ho Cheuk Hin
****************************************************************************************/

import React from "react";

class Choice extends React.Component {

    render() {
        //pop up a new window and provide different options for users to choose
        const choiceItems = this.props.script_answer.map((item, index) =>
            <button key={item} className="btn btn-light" onClick={() => this.props.handleChoice(index + 1)}>
                {item}
            </button>
        );
        require("./choiceWindow.css");
        return (
            <div id="choiceWindow">
                <p>{this.props.pop_q}</p>
                {choiceItems}
            </div>
        );
    }
}

export default Choice;
