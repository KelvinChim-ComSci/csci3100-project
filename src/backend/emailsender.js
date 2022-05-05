/**************************************************************************************** 
This is an email sender handler in the backend server. This file is in charge of 
sending email to user for the uses of verification and forget password function. It 
links to the corresponding collections in database.

Last updated: 29/4/2022 by Au Tsz Nga
****************************************************************************************/

var nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

var transporter = nodemailer.createTransport({
    service: process.env.REACT_APP_MAIL_SERVER,
    auth: {
        user: process.env.REACT_APP_MAIL_AUTH_USER,
        pass: process.env.REACT_APP_MAIL_AUTH_PASSWORD
    },
});

//send email to user for the uses of verification and forget password function
let sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
};

module.exports = sendMail;