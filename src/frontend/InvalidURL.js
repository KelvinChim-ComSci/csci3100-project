import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { withRouter } from './withRouter';
import NotificationBox from './NotficationBox';
import Loading from './Loader.js';
import * as Loader from 'react-loader-spinner'

class InvalidURL extends React.Component {

    render() {
        require('./Background.css');

        return (
            <div id="background" >
                <NotificationBox message="Invalid URL" login={false} />
            </div>


        )
    }
}

export default InvalidURL;