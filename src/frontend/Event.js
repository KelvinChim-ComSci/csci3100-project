import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './Event.css';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (<div id = "event"><div className = "container topLeft"><h1  id='Location'>LOCATION</h1></div>
                <div><a href="./Main" className="container topRight" >Back to main page</a></div>
        
        
        
        
        
        
        </div>
        )
    }
}

export default Event;




