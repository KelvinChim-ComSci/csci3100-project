import React from "react";
import "./map.css";
import { withRouter } from '../withRouter.js';
import img from '../../backend/background/map.png'; 

const data = [
    {place: "NA",describe: "A college"},
    {place: "UC",describe: "A college"}
    ];


class Map extends React.Component {
    constructor(props) {
        super(props);
        this.navigator = this.navigator.bind(this);
    }

    navigator() {
        this.props.navigate("../event");
    }
    displayDescription() {
    var file=data[0];
    alert("You have clicked!");
    document.getElementById("place").innerText = file.place;
    document.getElementById("describe").innerText = file.describe;
    }
  
    //handleClick = value => console.log(value)

      // <div className="mapimg" useMap="#workmap"></div>
      // <area shape="rect" coords="519,73,695,192" value="WOOSAH" onClick={this.handleClick}/>

    render(){
        
        return (
            <div id="map">
                <h2>Map</h2>
               
                <img src={img} alt="Map" className="map-img" useMap="#workmap"/>
                <map name="workmap" >
                <area shape="rect" coords="519,73,695,192" onClick={this.displayDescription}/>
               
                </map>
                <div id="detail" className="detail">
                Place Details
                </div>
                <div className="describe_content">
                <tr ><td>Place:&ensp;</td>
                            <td id="place">?</td>
                        </tr>
                        <tr><td>Description:&ensp;</td>
                            <td id="describe">?</td>
                        </tr>
                </div>
                
                <a onClick={this.navigator}> Go to NA! </a>
            </div>
            
           
        )
    }

}

export default withRouter(Map);
