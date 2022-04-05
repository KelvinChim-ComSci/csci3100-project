import React from "react";
import Profile from "../Main_button_component/profile";
import { statRetrievebyId } from '../statUpdater/statRetrievebyId.js';

class AddFriend extends React.Component {
    constructor(props) {
        super(props);
        this.mounted = 0;
        this.state = {
            message: "",
            recommendationList: [],
            popUpBar: "",
        }
        this.createFriendRequest = this.createFriendRequest.bind(this);
        this.getRecommendation = this.getRecommendation.bind(this);
    }

    componentDidMount() {
        this.getRecommendation();
        this.mounted = 1;
    }

    componentWillUnmount() {
        this.mounted = 0;
    }

    popUp() {
        if (this.state.popUpBar === "profile")
            return (
                <div>
                    <div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => { this.setState({ popUpBar: "" }); this.props.setOverflow(1); }}>x</button>
                    <div className="popUp">
                        <Profile stat={this.state.targetStatistic} displayName={this.state.target.displayName} username={this.state.target.username} aboutMe={this.state.target.aboutMe} friend={true} />
                    </div>
                </div>
            );

        return;
    }

    async createFriendRequest(friendName) {
        let inputFriendName = friendName || document.getElementsByName("friendName")[0].value;
        if (this.isEmpty(inputFriendName)) return this.displayMessage("Friend name cannot be empty.");
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
            this.setState({ message: res.message });
            if (!friendName)
                document.getElementsByName("friendName")[0].value = "";
            setTimeout(() => {if (this.mounted) this.setState({ message: "" })}, 5000);
        });
    }

    deleteRecommendation(id) {
        let request = document.getElementsByClassName(id);
        request.length > 1 ? request[1].remove() : request[0].remove();
    }

   displayMessage() {
        if (this.state.message === "")
            return;

        return (
            <div className="displayMessage">
                {this.state.message}
            </div>
        )
    }

    async getRecommendation() {
        await fetch(process.env.REACT_APP_BASE_URL + "/user/findRandomUsers", {
            method: "POST",
            headers: new Headers({
                "Content-Type": 'application/json',
                "Accept": 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
                "Access-Control-Allow-Credentials": true,
            }),
            body: JSON.stringify({
                userId: this.props.userId
            }),
        })
        .then((data) => data.json())
        .then((res) => {
            this.setState({ recommendationList: res.users });
        });
    }

    showRecommendation() {
        if (this.state.recommendationList.length === 0) {
            return (
                <div>
                    Players you may know:
                </div>
            )
        } else {
            return (
                <div className="recommendList">
                    Players you may know:
                    {this.state.recommendationList.map((data) => {
                        return (
                            <div key={data.id} className={data.id} id="recommendBox">
                                <span className="checkFriendProfile" onClick={async () => { await this.showFriendProfile(data) }}>{data.displayName}</span>
                                <span className="checkmark" onClick={() => {this.createFriendRequest(data.username); this.deleteRecommendation(data.id)}}>
                                    <div className="checkmark_circle yellow"></div>
                                    <div className="checkmark_cross"></div>
                                    <div className="checkmark_slash"></div>
                                </span>
                            </div>
                        )
                    })}
                </div>
            )
        }
    }

    async showFriendProfile(data) {
        const stat = await statRetrievebyId(data.id);
        this.setState({ popUpBar: "profile", targetStatistic: stat, target: data });
        this.props.setOverflow(0);
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
                <span className="createRequest" onClick={() => this.createFriendRequest()}>
                            <div className="createRequest_roundBlock yellow"></div>
                            <div className="createRequest_head"></div>
                            <div className="createRequest_body"></div>
                            <div className="createRequest_horizontal"></div>
                            <div className="createRequest_vertical"></div>
                            </span>

                <br />
                {this.displayMessage()}
                <br />
                <div className="recommendedPlayers">
                    {this.showRecommendation()}
                </div>

                {this.popUp(this.state.popUpBar)}
            </div>
        )
    }
}

export default AddFriend;