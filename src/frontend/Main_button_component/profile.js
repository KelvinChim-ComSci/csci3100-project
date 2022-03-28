import React from "react";
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
        if (option === "edit"){
            return (
                <div>
                    <div id="shadowLayer2"></div>
                    <div className="popUp" id="confirmWindow">
                    <h4>Edit description</h4>
                        <textarea id="description" rows="10" cols="30" defaultValue={msg}></textarea>
                        <br></br>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-success" onClick={() => {this.setState({popUpBar : ""}); this.props.setOverflow(1);}}>Discard change</button>
                            <button className="btn btn-success" onClick={() => {this.setState({message : document.getElementById("description").value, popUpBar : ""}); this.props.setOverflow(1);}}>Save</button>
                        </div>   
                    </div>
                </div>
            )
        }
            
    }
    
    render(){
        require("./profile.css");
        const data1 = {img: img, text: "this is a test achievement"};
        const data2 = {img: img, text: "this is another test achievement"};
        const imgList = [data1, data2];
        return (
            <div className="profile">
                
                <h2>Profile</h2>

                <div className="container">
                    <div className="row">
                        <div className="col-6" id="image"><img src={img} /></div>
                        <div className="col-6">

                        <div className="d-flex flex-column" id="textbox">
                            <div className="p-2">User name: {this.props.username}</div>
                            <div className="p-2">User ID: {this.props.stat.user}</div>

                            <div className="p-2">Status: (On/Off)</div>
                            <div className="d-flex justify-content-between">
                                    <div className="p-2">About me:</div>
                                    <div className="p-2"><button className="btn btn-success" onClick={() => {this.setState({popUpBar : "edit"}); this.props.setOverflow(0);}}> Edit! </button></div>
                            </div>
                            <div className="p-2">{this.state.message}</div>
                        </div>    

                        </div>
                    </div>
                    <div className="row">
                        In-game progress: 
                    </div>
                    <div className="row">
                        <div className="col">Current semester: Year {this.props.stat.year} Sem {Math.ceil(parseInt(this.props.stat.sem)/2)}</div>
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
                    <div className="row achievement" >
                        {imgList.map((data) => {
                            return <img src={data.img} title={data.text}/>;
                        })}
                    </div>
                </div>

                {this.popUp(this.state.popUpBar)}
                
            </div>
        )
    }
}

export default Profile;
