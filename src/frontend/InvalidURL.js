/**************************************************************************************** 
This component is activated when the invalid URL is routed by accident.

Last updated: 5/5/2022 by Wong Yi Oi
****************************************************************************************/

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