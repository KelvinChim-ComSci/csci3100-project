import React from "react";
import { withRouter } from './withRouter.js';
import Main from "./Main.js";




class AdminPage extends React.Component {
    render(){
        return (
            <div id="adminPage">
                <button className="btn btn-success" onClick={this.props.logout}>Logout</button>
            </div>
        )
    }
}

export default withRouter(AdminPage);
