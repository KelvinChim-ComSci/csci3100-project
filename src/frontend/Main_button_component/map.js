import React from "react";
import "./map.css";
import { withRouter } from '../withRouter.js';
import img from '../../backend/background/map.png';
import ImageMapper from 'react-img-mapper';
import { NavigationType } from "react-router-dom";
import Main from "../Main";
import App from "../../App";

var URL = img;
var MAP = {
    name: "my-map",
    areas: [
    { name: "NA", shape: "poly",fillColor: "rgba(187, 151, 196, 0.2)", 
    place: "New Asia College (NA)",
    describe: "It is a college which aims at preserving Chinese culture and balancing it with Western culture. The famous facilities in New Aisa is Pavilion of Harmony.",
    coords: [397.63,81.29,397.63,108.38,421.34,114.48,445.05,132.77,468.76,144.28,497.21,142.25,572.40,118.54,586.62,74.51,472.14,57.58,431.50,66.38]},
   // { name: "5", shape: "circle", coords: [170, 100, 25 ] },
    { name: "U Lib", shape: "poly",fillColor: "rgba(187, 151, 196, 0.2)", 
    place: "The Chinese University of Hong Kong University Library (U Lib)",
    describe: "The University Library has extensive collections. It is the largest out of all the CUHK Libraries and have different facilities.",
    coords: [ 255.3,177.5,254.7,203.9,289.9,204.6,290.6,177.5]},

    { name: "CC HoCou", shape: "poly",fillColor: "rgba(187, 151, 196, 0.2)", 
    place: "Common Area in Chung Chi College (CC HoCou)",
    describe: "It is a common Area outside the Madam SHHo Hall. You can always find lovely cat there.",
    coords: [579.2,294.7,571.7,325.8,606.9,335.3,625.9,307.5]},

    { name: "UC", shape: "poly",fillColor: "rgba(187, 151, 196, 0.2)", 
    place: "United College (UC)",
    describe: "It is a college which places emphasis on moral education and environmental protection. Students always buy bubble tea at the canteen in United College. ",
    coords: [274.3,10.8,220.2,142.3,318.4,147.7,397.6,107.7,397.7,82.0,294.6,4.1]},

    { name: "Haddon-Cave", shape: "poly",fillColor: "rgba(187, 151, 196, 0.2)", 
    place: "The Sir Philip Haddon-Cave Sports Field",
    describe: "It is a standard track with a grass soccer pitch inside. The spectator stand with 2,000 seats which can be used for large events.",
    coords: [609.7,172.1,602.2,174.8,601.5,287.9,614.4,293.0,636.7,293.3,656.4,285.6,661.1,275.7,663.2,248.6,654.4,187.6,648.3,172.1]},

    { name: "The University Mall", shape: "poly",fillColor: "rgba(187, 151, 196, 0.2)", 
    place: "The University Mall",
    describe: "The University Mall is a long open space in the center of the headquarters in university. The beginning and end of the University Mall are the University Library and the Science Museum.",
    coords: [313.6, 187.7, 314.3, 206.2, 429.0, 206.2, 429.7, 187.0]},

    { name: "Weiyuan Lake", shape: "poly",fillColor: "rgba(187, 151, 196, 0.2)", 
    place: "Weiyuan Lake / Lake Ad Excellentiam",
    describe: "Weiyuan is a beautiful lake located at Chung Chi College. Weiyuan, means not complete, describes the shape of the lake. It is also a clever motto: In Search of Excellence.",
    coords: [487.72,369.86,472.82,384.08,461.98,386.11,459.27,389.50,472.14,395.60,490.43,393.56,507.37,393.56,524.30,403.73,529.04,416.60,531.75,447.76,536.49,447.76,541.24,436.92,539.88,425.40,543.27,417.27,540.56,404.40,545.98,392.21,545.30,383.40,525.66,369.18 ]},
    
    { name: "MedCan", shape: "poly",fillColor: "rgba(187, 151, 196, 0.2)", 
    place: "Basic Medical Sciences Building Snack Bar (MedCan)",
    describe: "There are many delicious food in MedCan. Leamon Pie is a famous food in MedCan",
    coords: [455.21,190.70,455.21,203.54,490.43,202.19,491.11,190.70]},

    { name: "CC Lib", shape: "poly",fillColor: "rgba(187, 151, 196, 0.2)", 
    place: "Chung Chi College Elisabeth Luce Moore Library (CC Lib)",
    describe: "It is a Chung Chi library located near Weiyuan Lake. Its collections focus on music, religion, education and arts.",
    coords: [451.82,355.63,457.92,368.50,490.43,354.95,483.66,340.73]},

    { name: "The three brothers", shape: "poly",fillColor: "rgba(187, 151, 196, 0.2)", 
    place: "Sino Building, Chen Kou Bun Building, Wong Foo Yuan Building (The three brothers)",
    describe: "These three buildings are near to each other. Students may found that it is easy to cofuse their names, so people always call them The three brothers.",
    coords: [363.08,406.44,393.56 ,457.24 ,426.08 ,438.95 ,402.37 ,393.56 ]},

    { name: "Swimming Pool", shape: "poly",fillColor: "rgba(187, 151, 196, 0.2)", 
    place: "The University Swimming Pool",
    describe: "It is an Olympic-sized swimming pool. There is a spectator stand outside the swimming pool that students always gather at there.",
    coords: [287.21,256.73,287.21,283.15,325.15,282.47,325.15,255.38]},

    { name: "University Station", shape: "poly",fillColor: "rgba(187, 151, 196, 0.2)", 
    place: "University Station",
    describe: "It is one of the entrance in CUHK. You can find student dem beat in front of the University Station.",
    coords: [528.37,500.59,523.62,535.82,524.30,548.69,543.95,548.69,554.78,503.98]},
    ]
}

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.navigator = this.navigator.bind(this);
        this.state = {
            location : "",
        };
    }

    navigator() {
        console.log(this.state.location)
        this.props.handleLocation(this.state.location);    
        this.props.navigate("../event");
    }

    displayDescription(area) {
    document.getElementById("detail").innerText ="Place Details";
    document.getElementById("detail").className = "tdT";
    document.getElementById("place").innerText = "Place :"+'\u00a0'+area.place;
    document.getElementById("place").className = "tdC";
    document.getElementById("describe").innerText = "Description :"+'\u00a0'+area.describe;
    document.getElementById("describe").className = "tdC";
    document.getElementById("placeButton").innerText = "Go to"+'\u00a0'+area.name+'\u00a0'+"!";
    document.getElementById("places").className = "tdB link";
    }
    
    showHover(area) {
    document.getElementById("hover").innerText = area.name;
    }

    leaveHover(area) {
    document.getElementById("hover").innerText ="";
    }


    render(){
        
        return (
            <>
    
                    <div>&ensp;</div>        
                    <h2>Map</h2>
                    <div className="img">
                    <ImageMapper src={URL} map={MAP} width={800} 
                    onClick={area => {this.displayDescription(area); 
                                      this.setState({location: area.name});
                                      }
                    }
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
                //<td className="tdC"><a id="placeButton" onClick={this.navigator}>GO to NA</a></td>
           
        )
    }

}

export default withRouter(Map);
