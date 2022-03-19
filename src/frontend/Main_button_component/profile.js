import React from "react";
import "./profile.css";
import img from './profile_pic.jpg';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          popUpBar: "",
          message: "Please change accordingly so that this part will be updated to user data upon editing.\nAlso I need the attributes of user photo, user name and status here, as well as a sample achievement for testing.",
        }
    
        this.popUp = this.popUp.bind(this);
          
      }

    popUp(option) {
        console.log("current Pop-up in profile: ", this.state.popUpBar);
        const msg = this.state.message;
        if (option === "edit")
            return (
                <div>
                    <div id="shadowLayer2"></div>
                    <div className="popUp" id="confirmWindow">
                    <h4>Edit description</h4>
                            <textarea id="description" rows="10" cols="30">{msg}</textarea>
                            <br></br>
                            <div className="d-flex justify-content-around">
                                <button className="btn btn-success" onClick={() => {this.setState({popUpBar : ""})}}>Discard change</button>
                                <button className="btn btn-success" onClick={() => {this.setState({message : document.getElementById("description").value, popUpBar : ""})}}>Save</button>
                            </div>
                            
                            
                    </div>
                </div>
            )
    }
    
    render(){
        return (
            <div className="profile">
                <h2>Profile</h2>

                <div className="container">
                    <div className="row">
                        <div className="col-6" id="image"><img src={img}></img></div>
                        <div className="col-6">

                        <div className="d-flex flex-column" id="textbox">
                            <div className="p-2">User name: XXX</div>
                            <div className="p-2">User ID: {this.props.stat._id}</div>
                            <div className="p-2">Status: (On/Off)</div>
                            <div className="d-flex justify-content-between">
                                    <div className="p-2">About me:</div>
                                    <div className="p-2"><button className="edit" onClick={() => this.setState({popUpBar : "edit"})}> Edit! </button></div>
                            </div>
                            <div className="p-2">{this.state.message}</div>
                        </div>    

                        </div>
                    </div>
                    <div className="row">
                        In-game progress: 
                    </div>
                    <div className="row">
                        <div className="col">Current semester: Year {this.props.stat.year} Sem {this.props.stat.sem}</div>
                        <div className="col">Stamina: {this.props.stat.stamina}</div>
                    </div>
                    <div className="row">
                        <div className="col">GPA: {this.props.stat.gpa}</div>
                        <div className="col">Sports: {this.props.stat.sports}</div>
                        <div className="col">Happiness: {this.props.stat.happiness}</div>
                        <div className="col">Money: {this.props.stat.money}</div>
                    </div>
                    <div className="row">
                        Achievement: 
                    </div>
                    <div className="row">
                        *Here are the achievements ... *
                    </div>
                </div>
                
                {this.popUp(this.state.popUpBar)}
            </div>
        )
    }
}

export default Profile;
