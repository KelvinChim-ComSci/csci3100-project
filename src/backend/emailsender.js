var nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

var transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVER,
    auth: {
        user: process.env.MAIL_AUTH_USER,
        pass: process.env.MAIL_AUTH_PASSWORD
    },
});

var mailOptions = {
    from: 'emily.aritaone@gmail.com',
    to: 'hea4152@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
