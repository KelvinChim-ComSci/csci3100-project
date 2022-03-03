import React from "react";
import "./choiceWindow.css";

class Choice extends React.Component {

    render(){        
        return (
            <div>
                <h4>Are you sure to log out?</h4>
                <br></br>
                <div className="d-flex justify-content-around">
                    <button className="btn btn-success" onClick={this.userLogout}>Yes</button>
                    <button className="btn btn-success" onClick={() => {this.setState({popUpBar : ""})}}>No</button>
                </div>
            </div>
    
        )
    }
}

export default Choice;
