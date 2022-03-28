import React from 'react';
import AddFriend from './Main_button_component/addFriend';

// fetch friends from backend, if no friends put a message to tell player to add friends by pressing the + button.
// There will be a list of friends with no lights on and green lights depending on the status.


class FriendList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addFriendPopUp: "hide",
            friends: []
        }

        this.fetchFriendList = this.fetchFriendList.bind(this);
    }


    componentDidMount() {
        this.fetchFriendList();
    }


    addFriend() {
        if (this.state.addFriendPopUp === "hide") return;
        return (
            <div>
                <div id="shadowLayer"></div>
                <button className="closeButton" onClick={() => {this.setState({addFriendPopUp : "hide"})}}>x</button>
                <div className="popUp">
                    <AddFriend userId = {this.props.stat.user}/>
                </div>
            </div>

        );
    }

    showFriends() {
        if (this.state.friends.length === 0) {
        return (
            <div>
                You have no friends. Maybe you should stand here, realize you were
                Just like me trying to make history.<br />

                But who's to judge the right from wrong.<br />
                When our guard is down I think we'll both agree.<br /><br />

                That violence breeds violence.<br />
                But in the end it has to be this way.<br /><br />

                I've curved my own path, you've followed your wrath;<br />
                But maybe we're both the same.<br /><br />

                The world has turned, and so many have burned.<br />
                But nobody is to blame.<br /><br />

                It's tearing across this barren wasted land.<br />
                I feel new life could be born beneath<br />
                The blood stained sand.
            </div>
        )} else {
            return (
            <div>
                {this.state.friends.map((data) => {
                    return <div> {data.username} {data.status.toString()} </div>;
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
            console.log(res.friendList);
            this.setState({ friends: res.friendList });
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
                    <button onClick={()=>this.setState({addFriendPopUp: "show"})}> friend++ </button>
                </div>
                
                {this.addFriend()}
            </div>
        )
    }
}


export default FriendList;