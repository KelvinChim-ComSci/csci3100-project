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
          profileImg: "",
          profilegetImg: "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",
        }
    
        this.popUp = this.popUp.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fetchImg = this.fetchImg.bind(this);
          
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

    async componentDidMount() {
        this.fetchImg();
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

    onFileChange(e) {
        console.log(e.target.files[0]);
        this.setState({ profileImg: e.target.files[0]});
    }

    async fetchImg() {
        await fetch(process.env.REACT_APP_BASE_URL + "/profile/getImg/" + this.props.stat.user, { //+ this.props.stat.userId
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
                console.log(res.pics);
                if (res!=null) {this.setState({profilegetImg : res.pics});}
                
            });
    }

    async onSubmit(e) { 
        
        e.preventDefault()
        const formData = new FormData()
        formData.append('profileImg', this.state.profileImg)
        formData.append('userId', this.props.stat.user)
        console.log(this.state.profileImg.name);
        console.log(formData.get('profileImg'));
        
        await fetch(process.env.REACT_APP_BASE_URL + "/profile/postImg", {
            method: "POST", 
            body: formData,
        })
        .then((data) => data.json())
        .then((res) => {
            console.log(res);
            this.fetchImg();
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
                        <div className="first" id="image"><img src={ `data:image/jpg;base64,${this.state.profilegetImg}`} /></div>
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
                            <div className="row">
                                    <form onSubmit={this.onSubmit}>
                                        <div className="p-2">Change Your Profile Image:</div>
                                        <div className="form-group">
                                            <input type="file" onChange={this.onFileChange}/>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary" type="submit">Upload</button>
                                        </div>
                                    </form>  
                                </div>
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
