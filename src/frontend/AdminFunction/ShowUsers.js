import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Profile from "../Main_button_component/profile";
import { statRetrievebyId } from "../statUpdater/statRetrievebyId";

class ShowUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            popUpBar: "",
            targetStatistic: "",
            target: null
        }

        this.getUserList = this.getUserList.bind(this);
        this.displayUserList = this.displayUserList.bind(this);
        this.popUp = this.popUp.bind(this);
    }

    componentDidMount() {
        this.getUserList();

    }

    async getUserList() {
        await fetch(process.env.REACT_APP_BASE_URL + "/admin/getusers", {
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
                this.setState({ userList: res.userList });
                console.log(this.state.userList)
            });
    }

    displayUserList() {
        //const userList = this.state.userList;
        if (this.state.userList.length !== 0) {
            return (
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">User ID</th>
                                <th scope="col">Username</th>
                                <th scope="col">Display Name</th>
                                <th scope="col">Email</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.userList.map((data) => {
                                return (
                                    <tr key={data._id} onClick={async () => { await this.showUserProfile(data) }}>
                                        <th scope="row">{data.userId}</th>
                                        <td>{data.username}</td>
                                        <td>{data.displayName}</td>
                                        <td>{data.email}</td>
                                        <td><button>Reset Password</button></td>
                                    </tr>

                                );
                            })}
                        </tbody>
                    </table>

                </div >

            );
        }
    }


    async showUserProfile(data) {
        const stat = await statRetrievebyId(data._id);

        this.setState({ popUpBar: "profile", targetStatistic: stat, target: data })
        console.log("s", this.state.targetStatistic, this.state.popUpBar)
    }

    /*popUp() {
        if (this.state.popUpBar === "profile") {
            return (
                <div>
                    OuO
                    {/*<div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => { this.setState({ popUpBar: "" }); this.props.setOverflow(1); }}>x</button>
                    <div className="popUp">
                        <Profile stat={this.state.targetStatistic} displayName={this.state.target.displayName} username={this.state.target.username} friend={true} />
            </div>
                </div>
            )
        }
    }*/

    popUp() {
        if (this.state.popUpBar === "profile") {
            return (
                <div>
                    <div id="shadowLayer"></div>
                    <button className="closeButton" onClick={() => { this.setState({ popUpBar: "" }); this.props.setOverflow(1); }}>x</button>
                    <div className="popUp">
                        <Profile stat={this.state.targetStatistic} displayName={this.state.target.displayName} username={this.state.target.username} friend={true} />
                    </div>
                </div>
            );
        }
        return;
    }


    render() {

        return (
            <div className="showUsers">
                <h2>Users</h2>
                <div>
                    {this.displayUserList()}
                </div>
                <div>
                    {this.popUp()}
                </div>

            </div>

        )
    }
}

export default ShowUsers;
