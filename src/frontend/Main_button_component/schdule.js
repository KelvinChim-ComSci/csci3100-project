import React from "react";
import { Button } from "react-bootstrap";
// import "./schdule.css";

function PopSchdule(props){
    return (props.trigger)?(<div className="schedule">
        <div className="schedule-content">
            {props.children}
        </div>
    </div>):"";
}

export default PopSchdule




