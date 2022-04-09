import React from "react";
import ChangePassword from "../SignInPage/ChangePassword";

class Setting extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          popUpBar: "",
        }
    
        this.popUp = this.popUp.bind(this);
        this.handleInnerPopClose = this.handleInnerPopClose.bind(this);
          
      }

    handleInnerPopClose() {
        this.setState({popUpBar: ""});
    }
      
    popUp(option) {
        if (option === "password"){
            return (
                <div className="PopUp">
                    <div id="shadowLayer"></div>
                    <div className="popUp" style={{width: "auto", height: "auto"}}>
                        <ChangePassword id={this.props.id} handlePopClose={this.handleInnerPopClose} setOverflow={this.props.setOverflow} loginPage={false}/>
                    </div>
                </div>
            )
        }

        else if (option === "reset"){
            return (
                <div>
                    <div id="shadowLayer"></div>
                    <div className="popUp" id="confirmWindow">
                    <h4>Are you sure to reset data?</h4>
                    <h4 style={{color: "red"}}>This action is irreversible.</h4>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-success" onClick={() => {this.props.handlePopClose(); this.props.resetData();}}>Yes</button>
                            <button className="btn btn-success" onClick={() => {this.setState({popUpBar : ""}); this.props.setOverflow(1);}}>No</button>
                        </div>   
                    </div>
                </div>
            )
        }
            
    }
    
    render(){
        require("./setting.css");

        return (
            <div id="setting">
                <h3 style={{textAlign: "center"}}>Settings</h3>

                <div className="d-flex flex-column">
                    <button className="btn btn-success" onClick={() => {this.setState({popUpBar : "password"}); this.props.setOverflow(0);}}>Change Password</button>
                    <button style={{display: `${this.props.year>4? "" : "none"}`}}className="btn btn-success" onClick={() => {this.setState({popUpBar : "reset"}); this.props.setOverflow(0);}}>Reset Data</button>
                    <button className="btn btn-success" onClick={this.props.handlePopClose}>Back</button>
                </div>

            {this.popUp(this.state.popUpBar)}
            </div>
        )
    }
}

export default Setting;
