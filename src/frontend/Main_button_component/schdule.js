import React from "react";
import "./schdule.css";
/*

import { Draggable } from 'react-beautiful-dnd';

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

*/

function displaySchedule(){
    return (
    <div className="schedule"> 
        <h1>Schedule</h1>
        <h2>Click on activities to plan your Ulife!</h2>
        <ul className="list-group">
            <li className="list-group-item list-group-item-action" onClick={()=>this.addStat("gpa")}>Study</li>
            <li className="list-group-item list-group-item-action" onClick={()=>this.addStat("money")}>Part time</li>
            <li className="list-group-item list-group-item-action" onClick={()=>this.addStat("sports")}>Gym</li>
            <li className="list-group-item list-group-item-action" onClick={()=>this.addStat("happiness")}>Hang out with friends</li>
            <li className="list-group-item list-group-item-action">Rest</li>
        </ul>

        {/*
        <div id="div1" onDrop="drop(event)" onDragover="allowDrop(event)"></div>
        <div id="drag1" draggable="true" onDragstart="drag(event)" width="336" height="69"><button></button></div>
        */}

    </div>
    );
}

export default displaySchedule




