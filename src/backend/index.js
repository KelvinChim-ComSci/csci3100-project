// use node index.js to run

const accountHandling = require('./accountHandler.js');
const statisticHandling = require('./statisticHandler.js');
const friendHandling = require('./friendHandler.js');
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

var MessageSchema = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: { type: String },
    date: { type: String },
    time: { type: String }
});
var Message = mongoose.model('Message', MessageSchema);

var ProfileSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    stat: { type: mongoose.Schema.Types.ObjectId, ref: 'Statistic' },
    img: { data: Buffer, contentType: String }, //data: imgPath, contentType: imgFormat(png/jpg)
    awards: [{ type: String }]
});
var Profile = mongoose.model('Profile', ProfileSchema);

var EventSchema = mongoose.Schema({
    EventName: { type: String, required: true },
    EventTextfile: { data: Buffer, contentType: String } //required: true
});
var Event = mongoose.model('Event', EventSchema);

app.post('/register', async function (req, res) {
    return accountHandling.register(req, res);
});

app.post('/login', async function (req, res) {
    return accountHandling.login(req, res);
});

app.post('/logout', async function (req, res) {
    return accountHandling.logout(req, res);
});

app.post('/email', async function (req, res) {
    return accountHandling.email(req, res);
})

app.get('/email/confirm/:id', async function (req, res) {
    return accountHandling.confirmEmail(req, res);
})

app.post('/stat/update', async function (req, res) {
    return statisticHandling.statUpdate(req, res);
})

app.post('/stat/retrieve', async function (req, res) {
    return statisticHandling.stat(req, res);
});

app.post('/stat/resetStat', async function (req, res) {
    return statisticHandling.resetStat(req, res);
})

app.post('/friend/sendRequest', async function (req, res) {
    return friendHandling.sendRequest(req, res);
});

app.post('/friend/getFriendList', async function (req, res) {
    return friendHandling.getFriendList(req, res);
});

app.post('/friend/checkIncomingRequest', async function (req, res) {
    return friendHandling.checkIncomingRequest(req, res);
});

app.post('/friend/manageIncomingRequest', async function (req, res) {
    return friendHandling.manageIncomingRequest(req, res);
});

// General
app.get('/', async function (req, res) {
    return res.json('Server-side of the game: CU Simulator.');
})

const portNumber = process.env.PORT || 2096;
app.listen(portNumber);
console.log("Connected successfully to server...");