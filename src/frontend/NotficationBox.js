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