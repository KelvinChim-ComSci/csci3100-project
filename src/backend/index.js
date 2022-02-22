// use node index.js to run

const mailer = require('./emailsender.js');
const accountHandling = require('./accountHandler.js');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');

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

var Statistic = mongoose.model('Statistic', StatSchema);

app.post('/login', async function (req, res) {
    return accountHandling.login(req, res);
});

app.get('/test', async function (req, res) {
    return accountHandling.test(req,res);
});

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

const portNumber = process.env.PORT || 2096;
app.listen(portNumber);
console.log("Connected successfully to server...");