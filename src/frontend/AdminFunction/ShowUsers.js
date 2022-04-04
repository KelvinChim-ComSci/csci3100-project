import React from "react";


class ShowUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }


    }

    componentDidMount() {
        console.log("owo");
        fetch(process.env.REACT_APP_BASE_URL + "/admin/getusers", {
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

            });
    }


    render() {
        require("./ShowUsers.css");

        return (
            <div className="showUsers">

                <h2>Users</h2>

                <div className="container">


                </div>


            </div>
        )
    }
}

export default ShowUsers;
