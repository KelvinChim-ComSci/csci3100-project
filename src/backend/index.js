// use node index.js to run

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
    stamina: { type: Number, required: true },
    year: { type: Number, required: true },
    sem: { type: Number, required: true },
    eventProgress: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});
var Statistic = mongoose.model('Statistic', StatSchema);

var FriendListSchema = mongoose.Schema({
    requester: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    accepted: { type: Boolean, required: true } // 0 is false, 1 is true
});
var FriendList = mongoose.model('FriendList', FriendListSchema);

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
    return accountHandling.email(req, res)
})

app.get('/email/confirm/:id', async function (req, res) {
    return accountHandling.confirmEmail(req, res)
})

app.post('/addStat', async function (req, res) {
    console.log(req.body.val);
    console.log("req.body.corr", req.body.corr);
    let corr = String(req.body.corr);
    let userId = req.body.id;
    switch (corr) {
        case "gpa": {
            let userStat = await Statistic.findOneAndUpdate({ _id: userId }, { gpa: req.body.val + 1 });
            return res.send(userStat);
        }
        case "sports": {
            let userStat = await Statistic.findOneAndUpdate({ _id: userId }, { sports: req.body.val + 1 });
            return res.send(userStat);
        }
        case "happiness": {
            let userStat = await Statistic.findOneAndUpdate({ _id: userId }, { happiness: req.body.val + 1 });
            return res.send(userStat);
        }
        case "money": {
            let userStat = await Statistic.findOneAndUpdate({ _id: userId }, { money: req.body.val + 1 });
            return res.send(userStat);
        }
        default:
            console.log("not into any case")

    }
})

app.get('/test', async function (req, res) {
    return accountHandling.test(req, res);
});

app.post('/stat', async function (req, res) {
    console.log(req.body.userId);
    Statistic.findOne({ user: req.body.userId })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

app.get('/', async function (req, res) {
    return res.json('0');
})

const portNumber = process.env.PORT || 2096;
app.listen(portNumber);
console.log("Connected successfully to server...");