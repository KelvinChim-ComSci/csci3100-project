// use node index.js to run

const accountHandling = require('./accountHandler.js');
const statisticHandling = require('./statisticHandler.js');
const friendHandling = require('./friendHandler.js');
const achievementHandling = require('./achievementHandler.js');
const profileHandling = require('./profileHandler.js');
//const api = require('./profileimgHandler.js');

const dotenv = require('dotenv');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');

var fs = require('fs');
var path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Mongoose is connected!");
});
var multer = require('multer');
//set up EJS
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }))
app.use(bodyParser.json({limit: '50mb'}))

let uuidv4 = require('uuid/v4');
const DIR = './public/';
// Set EJS as templating engine
app.set("view engine", "ejs");
app.use(express.static(DIR));
/*
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Helllllllllllllllllo')
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname  //.toLowerCase().split(' ').join('-');
        console.log('Helllllllllllllllllo')
        cb(null,fileName) // uuidv4() + '-' + fileName
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log('Helllllllllllllllllo')
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});
//set up multer for storing uploaded files
*/
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'DIR') //fileName
	},
	filename:function (req, file, cb)  {
		cb(null, file.fieldname + '-' + Date.now())
	}
});
var upload = multer({ storage: storage });

//test



// Schema

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

app.post('/user/findRandomUsers', async function (req, res) { // for friend recommendation
    return accountHandling.findRandomUsers(req, res);
})

app.post('/achievement/update', async function (req, res) {
    return achievementHandling.achievementUpdate(req, res);
})

app.get('/achievement/retrieve/:userId', async function (req, res) {
    return achievementHandling.achievement(req, res);
});
//profile/retrieve
app.get('/api', async function (req, res) {
    return profileHandling.profileImgRetrieve(req, res);
});

//app.post('/uploadfile', upload.single('myImage'), async function (req, res, next) {
app.post('/api/user-profile', upload.single('profileImg'), async function (req, res, next) {
        return profileHandling.profileImgPost(req, res);
});

// General
app.get('/', async function (req, res) {
    return res.json('Server-side of the game: CU Simulator.');
})

const portNumber = process.env.PORT || 2096;
app.listen(portNumber);
console.log("Connected successfully to server...");