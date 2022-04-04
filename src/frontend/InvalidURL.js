import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { withRouter } from './withRouter';
import NotificationBox from './NotficationBox';

class InvalidURL extends React.Component {

    render() {
        require('./Background.css');

        const notificationBox = () => {
            return <NotificationBox message="Invalid URL" login={false} />
        }

        return (
            <div id="background">
                {notificationBox()}
            </div>
        )
    }
}

export default InvalidURL;