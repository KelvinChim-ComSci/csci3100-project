var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: process.env.REACT_APP_MAIL_SERVER,
    auth: {
        user: process.env.REACT_APP_MAIL_AUTH_USER,
        pass: process.env.REACT_APP_MAIL_AUTH_PASSWORD
    },
});

var mailOptions = {
    from: 'cusimulator3100@gmail.com',
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
