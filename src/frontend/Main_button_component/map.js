import React from "react";
import "./map.css";
import { withRouter } from '../withRouter.js';
import img from '../../backend/background/map.png';
import ImageMapper from 'react-img-mapper';

const data = [
    {place: "NA",describe: "A college"},
    {place: "UC",describe: "A college"}
    ];

var URL = img;
var MAP = {
    name: "my-map",
    areas: [
    { name: "4", shape: "poly", place: "NA",
    describe: "A college",
    coords: [398,81,398,108,421,114,445,133,469,144,497,142,522,111,518,88,498,81,481,80,462,67,431,68]},
   // { name: "5", shape: "circle", coords: [170, 100, 25 ] },
   // { name: "6", shape: "poly", coords: [ 400,67,400,143,522,143,522,67],place: "NA", describe: "College" },
    ]
}

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.navigator = this.navigator.bind(this);
    }

    navigator() {
        this.props.navigate("../event");
    }
    displayDescription(area) {
    //var file=data[0];
    document.getElementById("detail").innerText ="Place Details";
    document.getElementById("detail").className = "tdC";
    document.getElementById("place").innerText = "Place :"+'\u00a0'+area.place;
    document.getElementById("place").className = "tdC";
    document.getElementById("describe").innerText = "Description:"+'\u00a0'+area.describe;
    document.getElementById("describe").className = "tdC";
    document.getElementById("placeButton").innerText = "Go to"+'\u00a0'+area.place+'\u00a0'+"!";
    document.getElementById("places").className = "tdC link";
    //document.getElementById("detail").className = "tdC";
    }
    
    showHover(area) {
    document.getElementById("hover").innerText = area.place;
    }

    leaveHover(area) {
    document.getElementById("hover").innerText ="";
    }

    //handleClick = value => console.log(value) 590,99,590,210,770,210,770,99
      // <div className="mapimg" useMap="#workmap"></div>
      // <area shape="rect" coords="519,73,695,192" value="WOOSAH" onClick={this.handleClick}/>

    render(){
        
        return (
            <>
           {/*} <div id="map">
                <h2>Map</h2>               
                <img src={img} alt="Map" className="map-img" useMap="#workmap"/>
                <map name="workmap" >
                <area shape="rect" coords="399,64,527,146" onClick={this.displayDescription}/>                
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
            </div>Click the map to show more details!
        */}
                            
                    <h2>Map</h2>
                    <div className="img">
                    <ImageMapper src={URL} map={MAP} width={800} 
                    onClick={area => this.displayDescription(area)}
                    onMouseEnter={area => this.showHover(area)}
                	onMouseLeave={area => this.leaveHover(area)}/>
                    </div>
                    
                    <div className="describe_content">
                    <tr>
                        <td id="detail"></td>
                    </tr>
                    <tr>  
                        <td id="place"></td> 
                    </tr>
                    <tr> 
                        <td id="describe"></td>
                    </tr>
                      
                    </div>
                    <td id="places"><a id="placeButton" onClick={this.navigator}></a></td>
                    &ensp;&ensp;&ensp;&ensp;&ensp;Place that you are now pointing to :&ensp;<span id="hover"></span> 
                </>
                //<a id="placeButton" className="link" onClick={this.navigator}>GO to NA!</a>
                //<a id="placeButton" className="link" onClick={this.navigator}></a>
                //<td className="tdC"><a id="placeButton"   onClick={this.navigator}>GO to NA</a></td>
           
        )
    }

}

export default withRouter(Map);
