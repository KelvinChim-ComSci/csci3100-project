import React from 'react';
import AddFriend from './Main_button_component/addFriend';
import './friendList.css';

// fetch friends from backend, if no friends put a message to tell player to add friends by pressing the + button.
// There will be a list of friends with no lights on and green lights depending on the status.


class FriendList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addFriendPopUp: "hide"
        }
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
    render() {
        return (
            <div className="friendList">
                <p>Let there be friend.</p>

                <div className="onlineFriends">
                    It is supposed to show your friends but you don't have any.. F
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