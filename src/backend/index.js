// use node index.js to run

//const bcrypt = require("bcrypt");
const mailer = require('./emailsender.js')
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
var mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Mongoose is connected!");
});


// Schema

var StatSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    gpa: { type: Number, required: true },
    sports: { type: Number, required: true },
    happiness: { type: Number, required: true },
    money: { type: Number, required: true },
});

var UserSchema = mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    status: { type: Boolean, required: true }, // 0 is offline, 1 is online
    adminStatus: { type: Boolean, required: true } // 0 is user, 1 is admin
});


var User = mongoose.model('User', UserSchema);
var Statistic = mongoose.model('Statistic', StatSchema);

app.post('/login', async function (req, res) {
    let inputUsername = req.body.username;
    let inputPassword = req.body.password;
    try {
        await User.findOne({ username: inputUsername }, async function (error, response) {
            if (!response) {
                return res.send({ errorMsg: "No such user is found. Please try again." }); // subject to change by panda
            }
            else {
                if (!(inputPassword === response.password)) {
                    return res.send({ errorMsg: "Invalid Password. Please try again." }); // subject to change
                }
                else {
                    return res.send({
                        errorMsg: "none",
                        username: response.username,
                        accessLevel: response.adminStatus
                    });
                }
            }
        }).clone().catch(function (error) { console.log(error) });
    } catch (error) {
        console.log(error);
    }


});

app.get('/test', async function (req, res) {
    try {
        const user = await User.findOne({ name: "PikaChu" });
        return res.json(user);


    } catch (error) {
        console.log(error);
    }


});

//(req,res) =>{
app.get('/stat', async function (req, res) {

    Statistic.findOne({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });

});

app.post('/email', async function (req, res) {
    try {
        let mailOptions = {
            from: 'cusimulator3100@gmail.com',
            to: 'cusimulator3100@gmail.com',
            subject: 'Testing mail from CU Simulator',
            text: '3100 be with you :3',
        };
        console.log('no worry, it is fine');
        mailer(mailOptions);
        return (res.send({ message: "Email sent!" }))

    } catch (error) {
        console.log(error);
    }
})

app.get('/', async function (req, res) {
    return res.json('0');
})


//app.all('/*', async function (req, res) { // When this callback function is called, send this to client
//    res.send('Hello World :3');
//
//});



const portNumber = process.env.PORT || 2096;
app.listen(portNumber);
console.log("Connected successfully to server...");