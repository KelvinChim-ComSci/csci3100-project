import React from "react";

class AddFriend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.createFriendRequest = this.createFriendRequest.bind(this);
    }

    async createFriendRequest() {
        let inputFriendName = document.getElementsByName("friendName")[0].value;
        if (this.isEmpty(inputFriendName)) return console.log("friend name cannot be empty."); // TODO
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
            console.log(res.message);
            document.getElementsByName("friendName")[0].value = "";
        });
    }

    isEmpty(input) {
        return (input === "" || input === null) ? 1 : 0;
    }

    render() {
        return (
            <div>
                <p>YOU HAVE NO FRIENDS HAHAHA</p>
                
                <label htmlFor="friendName">Already know your friend's Username? Send them a friend request!</label>
                <br />
                <input type="text" placeholder="Player's username" name="friendName" required></input>
                <button onClick={this.createFriendRequest}>Add friend</button>
            </div>

        )
    }
}

export default AddFriend;