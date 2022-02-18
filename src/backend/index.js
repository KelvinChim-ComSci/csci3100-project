// use node index.js to run

//const bcrypt = require("bcryptjs");
//const cors = require('cors');
//app.use(cors());
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});





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


//app.all('/*', async function (req, res) { // When this callback function is called, send this to client
//    res.send('Hello World :3');
//
//});

app.listen(process.env.PORT || 2096);
console.log("Connected successfully to server...");