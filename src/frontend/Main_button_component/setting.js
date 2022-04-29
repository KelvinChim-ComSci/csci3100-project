/**************************************************************************************** 
This component is activated after clicking "Settings" button in main page.
This component generates a page with two major functions:
1. Change password
2. Reset data
When the "Change password" button is clicked, the change password component in 
ChangePassword.js will appear in a pop up window.
The "Reset data" button is not available until the user graduates in game. 
When the "Reset data" button is clicked, a confirm window will pop up.
If "Yes" button is clicked, the user's in-game progress will be reset, while user data 
such as achievement, friend list, etc will be kept.
When the "Back" button is clicked, this component will be closed. 
Last update: 29/4/2022 by Ku Nok Tik
****************************************************************************************/

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

    // called inside ChangePassword.js to close the change password window
    handleInnerPopClose() {
        this.setState({ popUpBar: "" });
    }

    // corresponding pop up windows
    popUp(option) {
        if (option === "password") {
            return (
                <div className="PopUp">
                    <div id="shadowLayer"></div>
                    <div className="popUp" style={{ width: "auto", height: "auto" }}>
                        <ChangePassword id={this.props.id} handlePopClose={this.handleInnerPopClose} setOverflow={this.props.setOverflow} loginPage={false} />
                    </div>
                </div>
            )
        }

        else if (option === "reset") {
            return (
                <div>
                    <div id="shadowLayer"></div>
                    <div className="popUp" id="confirmWindow">
                        <h4>Are you sure to reset data?</h4>
                        <h4 style={{ color: "red" }}>This action is irreversible.</h4>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-light" onClick={() => { this.props.handlePopClose(); this.props.resetData(); this.props.setOverflow(1); }}>Yes</button>
                            <button className="btn btn-light" onClick={() => { this.setState({ popUpBar: "" }); this.props.setOverflow(1); }}>No</button>
                        </div>
                    </div>
                </div>
            )
        }

    }

    render() {
        require("./setting.css");

        // layout of the page
        return (
            <div id="setting">
                <h3 style={{ textAlign: "center" }}>Settings</h3>

                <div className="d-flex flex-column">
                    <button className="btn btn-light" onClick={() => { this.setState({ popUpBar: "password" }); this.props.setOverflow(0); }}>Change Password</button>
                    <button style={{ display: `${this.props.year > 4 ? "" : "none"}` }} className="btn btn-light" onClick={() => { this.setState({ popUpBar: "reset" }); this.props.setOverflow(0); }}>Reset Data</button>
                    <button className="btn btn-light" onClick={this.props.handlePopClose}>Back</button>
                </div>

                {this.popUp(this.state.popUpBar)}
            </div>
        )
    }
}

export default Setting;
