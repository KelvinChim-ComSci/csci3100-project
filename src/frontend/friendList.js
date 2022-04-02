import React from 'react';
import AddFriend from './Main_button_component/addFriend';
import Profile from "./Main_button_component/profile";
import { statRetrievebyId } from './statUpdater/statRetrievebyId.js';

// fetch friends from backend, if no friends put a message to tell player to add friends by pressing the + button.
// There will be a list of friends with no lights on and green lights depending on the status.


class FriendList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            popUpBar: "",
            friends: [],
            incomingRequests: [],
            message: "",
            target: null,
            targetStatistic: [],
            chat: "",
            chatMessages: [],
        }

        this.fetchFriendList = this.fetchFriendList.bind(this);
        this.fetchMessages = this.fetchMessages.bind(this);
        this.checkIncomingRequest = this.checkIncomingRequest.bind(this);
        this.sendChatMessage = this.sendChatMessage.bind(this);
        this.manageRequest = this.manageRequest.bind(this);
        this.popUp = this.popUp.bind(this);
    }


    componentDidMount() {
        this.fetchFriendList();
        this.checkIncomingRequest();
        this.interval = setInterval(() => {
            this.periodicFetchMessage(this.state.chat);
        }, 2500); // fetch periodically every 2.5s
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    async periodicFetchMessage(correspondent) {
        if (correspondent === null) return;
        this.fetchMessages(correspondent.id);
    }



    popUp() {
        if (this.state.popUpBar === "addFriend")
            return (
                <div>
                    <div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => {this.setState({popUpBar : ""}); this.props.setOverflow(1);}}>x</button>
                    <div className="popUp" >
                        <AddFriend userId = {this.props.stat.user}/>
                    </div>
                </div>
            );
        if (this.state.popUpBar === "profile")
            return (
                <div>
                    <div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => {this.setState({popUpBar : ""}); this.props.setOverflow(1);}}>x</button>
                    <div className="popUp">
                        <Profile stat={this.state.targetStatistic} displayName={this.state.target.displayName} username={this.state.target.username} friend={true}/>
                    </div>
                </div>
            );
        if (this.state.popUpBar === "delete")
            return (
                <div>
                    <div id="shadowLayer"></div>
                    <div className="popUp" id="delete">
                        <h4>Are you sure to delete {this.state.target.displayName}?</h4>
                        <br></br>
                        <div className="d-flex justify-content-around">
                            <button className="btn btn-success" onClick={() => {this.manageRequest(this.state.target.id, "delete"); this.setState({popUpBar : "", target: null})}}>Yes</button>
                            <button className="btn btn-success" onClick={() => this.setState({popUpBar : ""})}>No</button>
                        </div>
                    </div>
                </div>
            );


        return;
    }

    async fetchFriendList() {
        await fetch(process.env.REACT_APP_BASE_URL + "/friend/getFriendList", {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": true,
            }),
            body: JSON.stringify({
                userId: this.props.stat.user,
            }),
        })
        .then((res) => res.json())
        .then((res) => {
            this.setState({ friends: res.friendList });
        });
    }

    showFriends() {
        if (this.state.friends.length === 0) {
        return (
            <div>
                Looks like you haven't added any friends yet. Invite friends to chat!
            </div>
        )} else {
            return (
            <div>
                <h3>Friends:</h3>
                {this.state.friends.map((data) => {
                    return (
                    <div key={data.id} className={data.id} id="friendBox">
                        <span className="checkFriendProfile" onClick={async () => { await this.showFriendProfile(data) }}>{data.displayName}</span>
                        &nbsp;
                        <button onClick={async () => { this.setState({chat: data}); await this.fetchMessages(data.id) }}>chat</button>
                        {this.showStatus(data.status)}
                        &nbsp;
                        <span className="rotated checkmark" onClick={() => this.setState({popUpBar: "delete", target: data})}>
                            <div className="checkmark_circle red"></div>
                            <div className="checkmark_cross"></div>
                            <div className="checkmark_slash"></div>
                        </span>
                    </div>
                    );
                })}
            </div>
            );
        }
    }

    showStatus(Boolean) {
        if (Boolean) {
            return (
                <span className="userStatus">
                    <div className='userStatus_block'></div>
                    <div className='userStatus_head lightGreen'></div>
                    <div className='userStatus_body lightGreen'></div>
                </span>
            )
        } else return (
            <span className="userStatus">
                <div className='userStatus_block'></div>
                <div className='userStatus_head gray'></div>
                <div className='userStatus_body gray'></div>
            </span>
        )
    }

    async checkIncomingRequest() {
        await fetch(process.env.REACT_APP_BASE_URL + "/friend/checkIncomingRequest", {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": true,
            }),
            body: JSON.stringify({
                userId: this.props.stat.user,
            }),
        })
        .then((res) => res.json())
        .then((res) => {
            this.setState({ incomingRequests: res.incomingRequest });
        });
    }

    showRequests() {
        if (this.state.incomingRequests.length === 0) {
            return;
        } else {
            return (
                <div>
                    Incoming Friend Requests: <br />
                    {this.state.incomingRequests.map((data) => {
                        return (
                        <div key={data.id} className={data.id}>
                            {data.username} &nbsp;
                            <span className="rotated checkmark" onClick={() => this.manageRequest(data.id, "accept")}>
                                <div className="checkmark_circle green"></div>
                                <div className="checkmark_stem"></div>
                                <div className="checkmark_kick"></div>
                            </span>
                            &nbsp; &nbsp;&nbsp;&nbsp;
                            <span className="rotated checkmark" onClick={() => this.manageRequest(data.id, "reject")}>
                                <div className="checkmark_circle red"></div>
                                <div className="checkmark_cross"></div>
                                <div className="checkmark_slash"></div>
                            </span>
                        </div>
                        );
                    })}
                </div>
            );
        }
    }

    
    async manageRequest(friendId, method) {
        await fetch(process.env.REACT_APP_BASE_URL + "/friend/manageIncomingRequest", {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": true,
            }),
            body: JSON.stringify({
                userId: this.props.stat.user,
                friendId: friendId,
                action: method
            }),
        })
        .then((data) => data.json())
        .then((data) => {
            this.deleteQuery(friendId);
            this.setState({message: data.message}); // successful message
            document.getElementsByClassName("displaySuccessMessage")[0].className += " fade-out";
            setTimeout(() => {
                this.setState({ message: "" });
                document.getElementsByClassName("displaySuccessMessage")[0].className = "displaySuccessMessage lightGreen";
                }, 5000);
        })
    }

    deleteQuery(id) {
        let request = document.getElementsByClassName(id)[0];
        request.remove();
    }

    async showFriendProfile(data) {
        const stat = await statRetrievebyId(data.id);
        this.setState({popUpBar: "profile", targetStatistic: stat, target: data});
    }

    async fetchMessages(friendId) {
        fetch(process.env.REACT_APP_BASE_URL + "/message/fetchPreviousMessages", {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": true,
            }),
            body: JSON.stringify({
                userId: this.props.stat.user,
                friendId: friendId
            }),
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.emptyMessageList) {
                this.setState({ chatMessages: [] });
            }
            else this.setState({ chatMessages: res.messageList });
        })
    }


    showChat() {
        if (this.state.chatMessages.length === 0) {
            return (
                <div className="chat" style={{display: `${this.state.chat? "flex" : "none"}`}}>
                <h3>Chatting with {this.state.chat? this.state.chat.displayName : ""}</h3>
                <div className="chatBox">
                </div>
                <div className="inputMessage">
                    <textarea id="chatMessage" row="1" placeholder={`Message ${this.state.chat.displayName}`} maxLength="200" autoFocus></textarea>
                    <button onClick={
                        async ()=>{
                            await this.sendChatMessage(document.getElementById("chatMessage").value, this.state.chat.id); 
                            document.getElementById("chatMessage").value = "";
                        }}>Send!</button>
                </div>
            </div>
            )
        }
        return (
            <div className="chat" style={{display: `${this.state.chat? "flex" : "none"}`}}>
                <h3>Chatting with {this.state.chat? this.state.chat.displayName : ""}</h3>
                <div className="chatBox">
                    {this.state.chatMessages.map((message, index) => {
                        return (
                            <div key={index} className={`chatMessage ${(message.from === this.props.stat.user)? "to" : "receive"}`}>{message.text}</div>
                        );
                    })}
                </div>
                <div className="inputMessage">
                    <textarea id="chatMessage" row="1" placeholder={`Message ${this.state.chat.displayName}`} maxLength="200" autoFocus></textarea>
                    <button onClick={async ()=>{
                        await this.sendChatMessage(document.getElementById("chatMessage").value, this.state.chat.id); 
                        document.getElementById("chatMessage").value = "";
                        }}>Send!</button>
                </div>
            </div>
        )
    }

    async sendChatMessage(message, friendId){
        const isValidMessage = (message !== "") && (message !== null);
        if (isValidMessage) {
            //upload message
            await fetch(process.env.REACT_APP_BASE_URL + "/message/sendMessage", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": 'application/json',
                    "Accept": 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                    "Access-Control-Allow-Credentials": true,
                }),
                body: JSON.stringify({
                    userId: this.props.stat.user,
                    friendId: friendId,
                    message: message
                }),
            })
            .then((res) => res.json())
            .then((res) => {
                console.log(res.message);
                let newMessage = { from: this.props.stat.user, text: message };
                this.setState(prevState => ({
                    chatMessages: [...prevState.chatMessages, newMessage]
                  }))
            })
        };
        return;
    };

    render() {
        require('./friendList.css');
        return (
            <div id="friend">
            
            <div className="friendList" style={{width: `${this.state.chat? "50%" : "100%"}`}}>
                <div className="onlineFriends">
                    {this.showFriends()}
                </div>

                <div>
                    <span className="friendAdder" onClick={()=>{this.setState({popUpBar: "addFriend"}); this.props.setOverflow(0);}}>
                            <div className="friendAdder_roundBlock yellow"></div>
                            <div className="friendAdder_head"></div>
                            <div className="friendAdder_body"></div>
                            <div className="friendAdder_horizontal"></div>
                            <div className="friendAdder_vertical"></div>
                            </span>
                            <div className='displaySuccessMessage'>{this.state.message}</div>
                </div>
                <div className="manageFriends">
                    {this.popUp()}
                    {this.showRequests()}
                </div>
            </div>

            {this.showChat()}

            </div>
        )
    }
}
export default FriendList;