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
});

var Statistic = mongoose.model('Statistic', StatSchema);

app.post('/login', async function (req, res) {
    return accountHandling.login(req, res);
});

app.post('/email', async function (req, res) {
    return accountHandling.email(req, res)
})

app.post('/addStat', async function (req, res) {
    console.log(req.body.val);
    console.log("req.body.corr", req.body.corr);
    let corr = String(req.body.corr);
    let userId = req.body.id;
    switch(corr){
        case "gpa":{
            let userStat = await Statistic.findOneAndUpdate({_id: userId}, {gpa: req.body.val + 1});
            return res.send(userStat);}
        case "sports":{
            let userStat = await Statistic.findOneAndUpdate({_id: userId}, {sports: req.body.val + 1});
            return res.send(userStat);}
        case "happiness":{
            let userStat = await Statistic.findOneAndUpdate({_id: userId}, {happiness: req.body.val + 1});
            return res.send(userStat);}
        case "money":{
            let userStat = await Statistic.findOneAndUpdate({_id: userId}, {money: req.body.val + 1});
            return res.send(userStat);}
        default:
            console.log("not into any case")
        
    }
})

app.get('/test', async function (req, res) {
    return accountHandling.test(req, res);
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

app.get('/', async function (req, res) {
    return res.json('0');
})

const portNumber = process.env.PORT || 2096;
app.listen(portNumber);
console.log("Connected successfully to server...");