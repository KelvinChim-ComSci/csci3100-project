import React from "react";
import "./status.css";

class Status extends React.Component {
    render(){
        return (
            <div className="status">
                <h2>Status</h2>
                GPA: {this.props.res.gpa}
                <br></br>
                Sports: {this.props.res.sports}
                <br></br>
                Happiness: {this.props.res.happiness}
                <br></br>
                Money: {this.props.res.money}
                <br></br>
                _id: {this.props.res._id}
                <br></br>
                Stamina: {this.props.res.stamina}
                <br></br>
                Sem: {this.props.res.sem}
                <br></br>
                Year: {this.props.res.year}

                

                
    
            </div>
        )
    }
}

/*
        document.getElementById("sports").innerText = res.sports;
        document.getElementById("happiness").innerText = res.happiness;
        document.getElementById("money").innerText = res.money;      
        document.getElementById("_id").innerText = res._id;
        document.getElementById("stamina").innerText = res.stamina;
        document.getElementById("sem").innerText = res.sem;
        document.getElementById("year").innerText = res.year;
                */

export default Status;
