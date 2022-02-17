// use node index.js to run
//const bcrypt = require("bcryptjs");

const express = require('express');
const app = express();

//const cors = require('cors');
//app.use(cors());
//app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://aua:3100ouo@cluster0.x9iai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log("Connected database!")
    // perform actions on the collection object
    //client.close();
});

app.all('/*', function (req, res) {
    // When this callback function is called, send this to client
    res.send('Hello World :3');
});

const server = app.listen(2096);
