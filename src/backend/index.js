// use node index.js to run

//const bcrypt = require("bcryptjs");
//const cors = require('cors');
//app.use(cors());
//app.use(express.json());
const dotenv = require('dotenv');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
dotenv.config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    //const collection = client.db("test").collection("devices");
    console.log("Connected database!")
    // perform actions on the collection object
    //client.close();
});

app.all('/*', function (req, res) {
    // When this callback function is called, send this to client
    res.send('Hello World :3');
});

const server = app.listen(2096);
