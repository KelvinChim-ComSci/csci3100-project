import React from 'react';

class Registration extends React.Component {
    constructor(props) {
        super(props);
    }
    sendEmail() {
        let mailOptions = {
            from: 'cusimulator3100@gmail.com',
            to: 'hea4152@gmail.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!',
        };

        //sendMail(mailOptions)
    }



    render() {
        return (
            <div>
                Registration Component
                <hr></hr>
                <button className="btn btn-outline-primary" onClick={this.sendEmail}>Send Email</button>

            </div>
        )
    }
}

export default Registration;