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
      
        return (<div id = "event">
                <div className = "container topLeft"><h1  id='Location'>LOCATION</h1></div>
                <div><a href="./Main" className="container topRight" >Back to main page</a></div>
                <div className="text">
                <svg className="corner" viewBox="0 0 88 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M35 3.5L65 6.5V62L0 0L35 3.5Z" fill="white"/>
                </svg>
                </div>
        
        
        
        
                </div>
        )
    }
}

export default Event;




