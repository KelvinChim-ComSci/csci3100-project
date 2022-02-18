import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    async send_request() {
        console.log('you clicked the button OoO!')

    }

    render() {
        return (
            <div>
                -------------------------------<br></br>
                Login Component
                <h5>OuO Login</h5>
                <button onClick={this.send_request}>send request to database</button>
                <br></br>
                -------------------------------
            </div>
        )
    }
}

export default Login;