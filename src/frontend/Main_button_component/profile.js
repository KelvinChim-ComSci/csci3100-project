import React from "react";
import img from './profile_pic.jpg';
import achievement_img1 from '../../backend/img/new_achievement1.jpg';
import achievement_img2 from '../../backend/img/new_achievement2.jpg';
import achievement_img3 from '../../backend/img/new_achievement3.png';
import achievement_img4 from '../../backend/img/new_achievement4.png';
import achievement_img5 from '../../backend/img/new_achievement5.jpg';
import achievement_img6 from '../../backend/img/new_achievement6.png';
import achievement_img7 from '../../backend/img/new_achievement7.png';
import achievement_img8 from '../../backend/img/new_achievement8.png';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          popUpBar: "",
          message: this.props.aboutMe,
          name: this.props.displayName,
          sociable: "",
          fxxxboy: "",
          happyjai: "",
          nerd: "",
          tooStronk4u: "",
          whoEvenStudies: "",
          futureSecurityGuard: "",
          emotionalDamage: "",
        }
    
        this.popUp = this.popUp.bind(this);
          
      }
      
    popUp(option) {
        const msg = this.state.message;
        const name = this.state.name;
        if (option === "about"){
            return (
                <div>
                    <div id="shadowLayer2"></div>
                    <div className="popUp" id="confirmWindow">
                    <h4>Edit description</h4>
                        <textarea id="description" rows="10" cols="30" defaultValue={msg}></textarea>
                        <br></br>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-success" onClick={() => {this.setState({popUpBar : ""}); this.props.setOverflow(1);}}>Discard change</button>
                            <button className="btn btn-success" onClick={() => {this.setState({popUpBar : ""});this.changeAboutMe(this.props.stat.user,document.getElementById("description").value); this.props.setOverflow(1);}}>Save</button>
                        </div>   
                    </div>
                </div>
            )
        }
        else if (option === "name"){
            return (
                <div>
                    <div id="shadowLayer2"></div>
                    <div className="popUp" id="confirmWindow">
                    <h4>Edit display name</h4>
                        <textarea id="displayName" rows="1" cols="30" defaultValue={name}></textarea>
                        <br></br>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-success" onClick={() => {this.setState({popUpBar : ""}); this.props.setOverflow(1);}}>Discard change</button>
                            <button className="btn btn-success" onClick={() => {this.setState({popUpBar : ""}); this.changeDisplayName(this.props.stat.user); this.props.setOverflow(1);}}>Save</button>
                        </div>   
                    </div>
                </div>
            )
        }
            
    }

    componentDidMount() {
        fetch(process.env.REACT_APP_BASE_URL + "/achievement/retrieve/"+ this.props.stat.user , { //+ this.props.userId
            method: "GET",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": true,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res!=null) {
                    this.setState({
                        sociable: res.sociable,
                        fxxxboy: res.fxxxboy,
                        happyjai: res.happyjai,
                        nerd: res.nerd,
                        tooStronk4u: res.tooStronk4u,
                        whoEvenStudies: res.whoEvenStudies,
                        futureSecurityGuard: res.futureSecurityGuard,
                        emotionalDamage: res.emotionalDamage,
                      });  
                }
                
            });
    }
    
    changeDisplayName(userId) {
        const displayName = document.getElementById("displayName").value;
        fetch(process.env.REACT_APP_BASE_URL + "/user/changeDisplayName" , {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": true,
            }), 
            body: JSON.stringify({
                userId: userId,
                displayName: displayName
            }),
        })
        .then((res) => res.json())
        .then((res) => alert(res.message));
        this.setState({name : displayName });
        this.props.handleDisplayName(displayName);
    }

    changeAboutMe(userId, newDescription) {
        if (newDescription == null) return;
        fetch(process.env.REACT_APP_BASE_URL + "/user/changeAboutMe" , {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": true,
            }), 
            body: JSON.stringify({
                userId: userId,
                newDescription: newDescription
            }),
        })
        .then((res) => res.json())
        .then((res) => alert(res.message));
        this.setState({ message: newDescription });
        this.props.handleAboutMe(newDescription);
    }

    render(){
        require("./profile.css");
       
        const data1 = {img: achievement_img1, text: "sociable", status: this.state.sociable };
        const data2 = {img: achievement_img2, text: "fxxxboy", status: this.state.fxxxboy};
        const data3 = {img: achievement_img3, text: "happyjai", status: this.state.happyjai};
        const data4 = {img: achievement_img4, text: "nerd", status: this.state.nerd};
        const data5 = {img: achievement_img5, text: "tooStronk4u", status: this.state.tooStronk4u};
        const data6 = {img: achievement_img6, text: "whoEvenStudies", status: this.state.whoEvenStudies};
        const data7 = {img: achievement_img7, text: "futureSecurityGuard", status: this.state.futureSecurityGuard};
        const data8 = {img: achievement_img8, text: "emotionalDamage", status: this.state.emotionalDamage};
        const imgList_tmp = [data1, data2, data3, data4, data5, data6, data7, data8 ];
        const imgList= [];
        for (let index = 0; index < imgList_tmp.length; index++) {
            const element = imgList_tmp[index];
            let t = Boolean(true);
            if (element.status === t) {
                imgList.push(element);
            }
        }

        return (
            <div className="profile">
                
                <h2>Profile</h2>

                <div className="container">
                    <div className="row">
                        <div className="first" id="image"><img src={img} /></div>
                        <div className="second">

                        <div className="d-flex flex-column" id="textbox">

                            <div className="p-2">User name: {this.props.username}</div>

                            <div className="d-flex justify-content-between">
                                    <div className="p-2">Display name: {this.state.name}</div>
                                    <div className="p-2"><button className="btn btn-success" onClick={() => {this.setState({popUpBar : "name"}); this.props.setOverflow(0);}} style={{display: `${this.props.friend? "none" : "flex"}`}}> Edit! </button></div>
                            </div>

                            <div className="d-flex justify-content-between">
                                    <div className="p-2">About me:</div>
                                    <div className="p-2"><button className="btn btn-success" onClick={() => {this.setState({popUpBar : "about"}); this.props.setOverflow(0);}} style={{display: `${this.props.friend? "none" : "flex"}`}}> Edit! </button></div>
                            </div>

                            <div className="p-2">{this.state.message}</div>
                        </div>    

                        </div> 
                    </div>

                    <div style={{padding: "0 15px"}}>

                    <div className="row"> 
                        In-game progress: {this.props.achievement}
                    </div>
                    <div className="row">
                        <div className="col">Current semester: Year {this.props.stat.year} Sem {Math.ceil(this.props.stat.sem/2)}</div>
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
                    <div className="row achievement">
                        {imgList.map((data, index) => {
                            return <img key={index} src={data.img} title={data.text}/>;
                        })}
                    </div>

                    </div>
                </div>

                {this.popUp(this.state.popUpBar)}
                
            </div>
        )
    }
}

export default Profile;
