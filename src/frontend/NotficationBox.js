/**************************************************************************************** 
This component is activated when the notification box is required. It is to notify user
about some return messages.

Last updated: 5/5/2022 by Wong Yi Oi
****************************************************************************************/

import React from "react";

const NotificationBox = props => {
  let { message, login } = props;
  let returnMsg = "Return to log in";
  let link = "/"
  if (login) {
    returnMsg = "Back";
    link = "./"
  }

  require("./NotificationBox.css");

  //notify user about some return messages
  return (
    <div id="notificationBox">
      <div className="container">
        <h4 id="message">{message}</h4>
        <br></br>
        <div className="links">
          <p><a href="/">{returnMsg}</a></p>
        </div>
      </div>
    </div>)
};

export default NotificationBox; 