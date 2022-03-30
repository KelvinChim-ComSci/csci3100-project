import React from "react";

class AddFriend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
        this.createFriendRequest = this.createFriendRequest.bind(this);
    }

    async createFriendRequest() {
        let inputFriendName = document.getElementsByName("friendName")[0].value;
        if (this.isEmpty(inputFriendName)) return this.displayMessage("Friend name cannot be empty."); // TODO
        await fetch(process.env.REACT_APP_BASE_URL + "/friend/sendRequest", {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": true,
            }),
            body: JSON.stringify({
                userId: this.props.userId,
                friendName: inputFriendName
            }),
        })
        .then((res) => res.json())
        .then((res) => {
            this.displayMessage(res.message);
        });
    }

   async displayMessage(message) {
        this.setState({ message: message });

        document.getElementsByName("friendName")[0].value = "";
        document.getElementsByClassName("displayMessage")[0].className += " fade-out";

        setTimeout(() => {
        this.setState({ message: "" });
        document.getElementsByClassName("displayMessage")[0].className = "displayMessage";
        }, 5000);
    }

    isEmpty(input) {
        return (input === "" || input === null) ? 1 : 0;
    }

    render() {
        require('./addFriend.css');
        return (
            <div className="addFriend">
                <label htmlFor="friendName">Already know your friend's Username? Send them a friend request!</label>
                <br />
                <input type="text" placeholder="Player's username" name="friendName" required></input>
                &nbsp;
                <span className="createRequest" onClick={this.createFriendRequest}>
                            <div className="createRequest_roundBlock yellow"></div>
                            <div className="createRequest_head"></div>
                            <div className="createRequest_body"></div>
                            <div className="createRequest_horizontal"></div>
                            <div className="createRequest_vertical"></div>
                            </span>

                <div className="displayMessage">{this.state.message}</div>
            </div>
        )
    }
}

export default AddFriend;