import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


class ForgetPassword extends React.Component {
    constructor(props) {
        super(props);
    }

    sendEmail() {
        console.log("wow")
    }


    render() {
        return (
            <div>
                Forget Password Component
                <hr></hr>
                <button onClick={this.sendEmail} className="btn btn-outline-primary">Send Email</button>
            </div>
        )
    }
}

export default ForgetPassword;