import React from "react";
import img from './profile_pic.jpg';
import axios from 'axios';
import achievement_img1 from '../img/achievement1.png';
import achievement_img2 from '../img/achievement2.png';
import achievement_img3 from '../img/achievement3.png';
import achievement_img4 from '../img/achievement4.png';
import achievement_img5 from '../img/achievement5.png';
import achievement_img6 from '../img/achievement6.png';
import achievement_img7 from '../img/achievement7.png';
import achievement_img8 from '../img/achievement8.png';

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
          profileImg: '',
          profilegetImg: '',
          base64File:"iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=",
        }
    
        this.popUp = this.popUp.bind(this);
       
      this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
       
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
        console.log(process.env.REACT_APP_BASE_URL);
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
                                                            ///profile/retrieve
            await fetch(process.env.REACT_APP_BASE_URL + "/api" , { //+ this.props.userId
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
                    console.log('hi');
                    console.log(res.pics);
                    if (res=null) {this.setState({profilegetImg : res.pics});}
                    //document.getElementById('proimg') = <img src={`data:image/jpeg;base64,<%- res.pics %>`} />
                   //const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />
                    //document.getElementById('proimg') =  <Example data={res} />;
                    //ReactDOM.render(<Example data={res} />, document.getElementById('container'))
                    
                });
    }

    
    onFileChange(e) {
        console.log("ho");
        console.log(e.target.files[0]);
        this.setState({ profileImg: e.target.files[0] })
        console.log("ha");
      // console.log(this.state.profileImg);
    }

    async onSubmit(e) { 
        
        e.preventDefault()
        const formData = new FormData()
        formData.append('profileImg', this.state.profileImg)
        console.log(this.state.profileImg.name);
        console.log(this.state.profileImg);//.toString('base64')
        
        await fetch(process.env.REACT_APP_BASE_URL + "/api/user-profile", {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'multipart/form-data',
               // "Accept": 'multipart/form-data',
               // "Access-Control-Allow-Origin": "*",
               // "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
               // "Access-Control-Allow-Credentials": true,
            }), //enctype
            body: formData
            // JSON.stringify({
              //  profileImg: this.state.profileImg//.toString('base64') //formData
               // ,path: process.env.REACT_APP_BASE_URL + "api/user-profile/" 
               // ,filename: this.state.profileImg.name
             //}),
        })
        .then((data) => data.json())
        .then((res) => {
            console.log(res);
        });
       
        /*   
        console.log("ho");
        
        e.preventDefault()
        
        const formData = new FormData()
        console.log(formData);
        formData.append('profileImg', this.state.profileImg)
        console.log(formData.values);
       await axios.post(process.env.REACT_APP_BASE_URL+"/api/user-profile", formData, {
       //await axios.post("http://localhost:4000/api/user-profile", formData, {    
        }).then(res => {
            console.log(res)
        })
    */

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
               
                <div className="container">
                    <div className="row">
                        <form onSubmit={this.onSubmit}>
                            <h3>React File Upload</h3>
                            <div className="form-group">
                                <input type="file" onChange={this.onFileChange}/>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary" type="submit">Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
                
                <div id="proimg"></div>
                <img src={ `data:image/png;base64,${this.state.base64File}`} />
                profile
                <img src={ `data:image/png;base64,${this.state.profilegetImg}`} />
                {/*<img src="data:image/png;base64,<%- pics %>"/> */}
                {/*}
                <h1>Upload Image</h1>
                <form action="/uploadfile" enctype="multipart/form-data" method="POST">
                    <input type="file" name="myImage" accept="image/*"/>
                    <input type="submit" value="Upload Photo"/>
                    </form>
                 */}
                            

                {this.popUp(this.state.popUpBar)}
                
            </div>
        )
    }
}

export default Profile;
