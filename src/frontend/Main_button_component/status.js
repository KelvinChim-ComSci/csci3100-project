import React from "react";
import "./status.css";

class Status extends React.Component {
    render(){
        return (
            <div className="status">
                <h2>Status</h2>
                GPA: {this.props.stat.gpa}
                <br></br>
                Sports: {this.props.stat.sports}
                <br></br>
                Happiness: {this.props.stat.happiness}
                <br></br>
                Money: {this.props.stat.money}
                <br></br>
                _id: {this.props.stat._id}
                <br></br>
                Stamina: {this.props.stat.stamina}
                <br></br>
                Sem: {this.props.stat.sem}
                <br></br>
                Year: {this.props.stat.year}  
            </div>
        )
    }
}

export default Status;
