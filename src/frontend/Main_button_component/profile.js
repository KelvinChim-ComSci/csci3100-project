import React from "react";
import img from './profile_pic.jpg';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          popUpBar: "",
          message: "Please change accordingly so that this part will be updated to user data upon editing.\nAlso I need the attributes of user photo, user name and status here, as well as a sample achievement for testing.",
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

    async componentDidMount() {
        console.log("hello2"); 
        console.log(typeof(this.props.stat.user)); 
        await fetch(process.env.REACT_APP_BASE_URL + "/achievement/retrieve/"+ this.props.stat.user , { //+ this.props.userId
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
                console.log(res);
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
            });
    }
   
    render(){
        require("./profile.css");
        
        let a = false;
        let b = true;
        let x = this.state.sociable;
        let y = this.state.fxxxboy;
        const data1 = {img: img, text: "sociable", status: this.state.sociable };
        const data2 = {img: img, text: "fxxxboy", status: this.state.fxxxboy};
        const data3 = {img: img, text: "happyjai", status: this.state.happyjai};
        const data4 = {img: img, text: "nerd", status: this.state.nerd};
        const data5 = {img: img, text: "tooStronk4u", status: this.state.tooStronk4u};
        const data6 = {img: img, text: "whoEvenStudies", status: this.state.whoEvenStudies};
        const data7 = {img: img, text: "futureSecurityGuard", status: this.state.futureSecurityGuard};
        const data8 = {img: img, text: "emotionalDamage", status: this.state.emotionalDamage};
        const imgList = [data1, data2, data3, data4, data5, data6, data7, data8 ];
        for (let index = 0; index < imgList.length; index++) {
            const element = imgList[index];
            let f = Boolean(false);
            if (element.status === f) {
                delete imgList[index];
            }
        }
       
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
                        In-game progress: {this.props.achievement}
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
                    <div className="row achievement">
                        {imgList.map((data, index) => {
                            return <img key={index} src={data.img} title={data.text}/>;
                        })}
                    </div>
                </div>

                {this.popUp(this.state.popUpBar)}
                
            </div>
        )
    }
}

export default Profile;
