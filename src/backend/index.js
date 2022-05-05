/*
This is the main backend server. To run it, input "node index.js" in terminal.
It connects the mongoDB server via express.
Every Handler.js file is just exports of functions according to what schema they are in account of.
Last Updated: 4/5/2022 by Chim Ka Chun.
*/

//Import the required file
const accountHandling = require('./accountHandler.js');
const statisticHandling = require('./statisticHandler.js');
const friendHandling = require('./friendHandler.js');
const achievementHandling = require('./achievementHandler.js');
const messageHandling = require('./messageHandler.js');
const profileHandling = require('./profileHandler.js');

//Set up mongoose and express
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

// Import multer, body-parser and public folder for saving image
var bodyParser = require('body-parser');
//var fs = require('fs');
//var path = require('path');
var multer = require('multer');
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }))
app.use(bodyParser.json({limit: '50mb'}))
const DIR = './public/';
app.set("view engine", "ejs");
app.use(express.static(DIR));

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, DIR) //fileName
	},
	filename:function (req, file, cb)  {
		cb(null, file.fieldname + '-' + Date.now()+".jpg")
	}
});
var upload = multer({ storage: storage });

//Connect to mongoose
mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Mongoose is connected!");
});

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

app.post('/user/changeDisplayName', async function (req, res) {
    return accountHandling.changeDisplayName(req, res);
})

app.post('/user/changeAboutMe', async function (req, res) {
    return accountHandling.changeAboutMe(req, res);
})

app.post('/email/forgetpassword', async function (req, res) {
    return accountHandling.forgetPassword(req, res);
})

app.get('/email/confirm/:id', async function (req, res) {
    return accountHandling.confirmEmail(req, res);
})

app.get('/resetpassword/:id', async function (req, res) {
    return accountHandling.checkResetLink(req, res);
})

app.post('/resetpassword', async function (req, res) {
    return accountHandling.resetPassword(req, res);
})

app.post('/stat/update', async function (req, res) {
    return statisticHandling.statUpdate(req, res);
})

app.get('/stat/retrieve/:userId', async function (req, res) {
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

app.post('/friend/sendGiftToFriend', async function (req,res) {
    return friendHandling.sendGiftToFriend(req, res);
});

app.post('/friend/receivedGift', async function (req, res) {
    return friendHandling.receivedGift(req, res);
})

app.post('/user/findRandomUsers', async function (req, res) { // for friend recommendation
    return accountHandling.findRandomUsers(req, res);
});

app.post('/message/sendMessage', async function (req, res) {
    return messageHandling.sendMessage(req, res);
});

app.post('/message/fetchPreviousMessages', async function (req, res) {
    return messageHandling.fetchPreviousMessages(req, res);
});

app.post('/achievement/update', async function (req, res) {
    return achievementHandling.achievementUpdate(req, res);
});

app.get('/achievement/retrieve/:userId', async function (req, res) {
    return achievementHandling.achievement(req, res);
});

app.get('/admin/getusers', async function (req, res) {
    return accountHandling.listAllUsers(req, res);
});

app.get('/profile/getImg/:userId', async function (req, res) {
    return profileHandling.profileImgRetrieve(req, res);
});

app.post('/profile/postImg', upload.single('profileImg'), async function (req, res, next) {
    return profileHandling.profileImgPost(req, res);
});

// General
app.get('/', async function (req, res) {
    return res.json('Server-side of the game: CU Simulator.');
});


const portNumber = process.env.PORT || 2096;
app.listen(portNumber);
console.log("Connected successfully to server...");