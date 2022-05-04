/**************************************************************************************** 
This component is activated after the user input correct username, email, password and 
confirm password for registration. Then, the system will route to this page and the
user will proceed to the verification stage. It informs user to check their email for
verification.


Last updated: 29/4/2022 by Au Tsz Nga
****************************************************************************************/

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