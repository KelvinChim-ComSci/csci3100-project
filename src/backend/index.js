// use node index.js to run

//const bcrypt = require("bcryptjs");
//const cors = require('cors');
//app.use(cors());
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
var mongoose = require('mongoose')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
console.log(uri);
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

MONGODB_URI='mongodb+srv://chim:kelvin1155126571@cluster0.x9iai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  console.log("Mongoose is connected!");
});

// Schema

var StatSchema = mongoose.Schema({ 
    //user: { type: mongoose.Schema.Types.ObjectId, ref:'User'},
    gpa: { type: Number, required: true },
    sports: { type: Number, required: true },
    happiness: { type: Number, required: true },
    money: { type: Number, required: true },
    });
    
//var User = mongoose.model('User', UserSchema);    
var Statistic = mongoose.model('Statistic', StatSchema);



app.get('/login', async function (req,res) {

    try {
        await client.connect();

        const db = client.db("myFirstDatabase");
        const collection = db.collection('users');

        const user = await collection.findOne( {name: "PikaChu"});
        return res.json(user);

        
    } catch(error) {
        console.log(error);
    } finally {
        await client.close();
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

//app.all('/*', async function (req, res) { // When this callback function is called, send this to client
//    res.send('Hello World :3');
//
//});

const portNumber = process.env.PORT || 2096;
app.listen(portNumber);
console.log("Connected successfully to server...");