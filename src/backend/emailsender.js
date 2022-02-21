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

/*var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cusimulator3100@gmail.com',
        pass: 'fubpnlruszxbocws'
    },
});*/

let sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
};

module.exports = sendMail;