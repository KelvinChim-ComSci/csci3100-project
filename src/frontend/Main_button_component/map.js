import React from "react";
import "./map.css";
import { withRouter } from '../withRouter.js';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.navigator = this.navigator.bind(this);
    }

    navigator() {
        this.props.navigate("../event");
    }

    render(){
        return (
            <div id="map">
                <h2>Map</h2>
                <div className="map-img"></div>
                <a onClick={this.navigator}> Go to NA! </a>
            </div>
            
           
        )
    }

}

export default withRouter(Map);
