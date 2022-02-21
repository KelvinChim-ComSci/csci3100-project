// use node index.js to run

//const bcrypt = require("bcryptjs");
//const cors = require('cors');
//app.use(cors());
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Mongoose is connected!");
});


// Schema

var StatSchema = Schema({ 
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    gpa: { type: Number, required: true },
    sports: { type: Number, required: true },
    happiness: { type: Number, required: true },
    money: { type: Number, required: true },
});

var UserSchema = Schema({
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    status: {  type: Boolean, required: true},
    adminStatus: { type: Boolean, required: true} //Online or not
}); 


var User = mongoose.model('User', UserSchema);    
var Statistic = mongoose.model('Statistic', StatSchema);

app.post('/login', async function (req,res) {
    try {
       //await User.findOne( {name: "PikaChu"})
        console.log({username: req.body.username});
        return res.send({username: req.body.username});

    } catch(error) {
        console.log(error);
    }
    

});

app.get('/test', async function (req,res) {
    try {
        const user = await User.findOne( {name: "PikaChu"});
        return res.json(user);

        
    } catch(error) {
        console.log(error);
    }
    

});

 //(req,res) =>{
app.get('/stat', async function (req,res) {

    Statistic.findOne({})
        .then((data)=>{
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) =>{
            console.log('error: ', error);
        });

});

app.post('/', async function (req,res) {
    return res.json('0');
})
//app.all('/*', async function (req, res) { // When this callback function is called, send this to client
//    res.send('Hello World :3');
//
//});



const portNumber = process.env.PORT || 2096;
app.listen(portNumber);
console.log("Connected successfully to server...");