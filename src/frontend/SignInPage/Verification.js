import React from 'react';

class Verification extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        require('./Verification.css');
        return (
            <div>
                Please check your email for Verification:
            </div>
        )
    }
}

export default Verification;