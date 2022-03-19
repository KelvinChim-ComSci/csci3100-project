import React from 'react';
import AddFriend from './Main_button_component/addFriend';

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
            <div class="FriendList">
                <div>
                    <button onClick={()=>this.setState({addFriendPopUp: "show"})}> + </button>
                </div>
                <div class="onlineFriends">
                </div>
                {this.addFriend()}
            </div>
        )
    }
}


export default FriendList;