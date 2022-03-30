import React from 'react';
import AddFriend from './Main_button_component/addFriend';

// fetch friends from backend, if no friends put a message to tell player to add friends by pressing the + button.
// There will be a list of friends with no lights on and green lights depending on the status.


class FriendList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addFriendPopUp: "hide",
            friends: [],
            incomingRequests: [],
            message: ""
        }

        this.fetchFriendList = this.fetchFriendList.bind(this);
        this.checkIncomingRequest = this.checkIncomingRequest.bind(this);
        this.manageRequest = this.manageRequest.bind(this);
    }


    componentDidMount() {
        this.fetchFriendList();
        this.checkIncomingRequest();
    }


    addFriend() {
        if (this.state.addFriendPopUp === "hide") return;
        return (
            <div>
                <div id="shadowLayer"></div>
                <button className="closeButton" onClick={() => {this.setState({addFriendPopUp : "hide"}); this.props.setOverflow(1);}}>x</button>
                <div className="popUp">
                    <AddFriend userId = {this.props.stat.user}/>
                </div>
            </div>

        );
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

    showFriends() {
        if (this.state.friends.length === 0) {
        return (
            <div>
                Looks like you haven't added any friends yet. Invite friends to chat!
            </div>
        )} else {
            return (
            <div>
                Friends:
                {this.state.friends.map((data) => {
                    return (
                    <div key={data.id} className={data.id}>
                        {data.username}
                        {this.showStatus(data.status)}
                        &nbsp;
                        <span className="rotated checkmark" onClick={() => this.manageRequest(data.id, "delete")}>
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

    render() {
        require('./friendList.css');
        return (
            <div className="friendList">
                <div className="onlineFriends">
                    {this.showFriends()}
                </div>

                <div>
                    <span className="friendAdder" onClick={()=>{this.setState({addFriendPopUp: "show"}); this.props.setOverflow(0);}}>
                            <div className="friendAdder_roundBlock yellow"></div>
                            <div className="friendAdder_head"></div>
                            <div className="friendAdder_body"></div>
                            <div className="friendAdder_horizontal"></div>
                            <div className="friendAdder_vertical"></div>
                            </span>
                            <div className='displaySuccessMessage'>{this.state.message}</div>
                </div>
                <div className="manageFriends">
                    {this.addFriend()}
                    {this.showRequests()}
                </div>
            </div>
        )
    }
}


export default FriendList;