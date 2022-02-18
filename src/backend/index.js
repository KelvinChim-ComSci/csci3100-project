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
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



async function main() {
    await client.connect();
        app.listen(2096);
        console.log("Connected successfully to server");
        const db = client.db("myFirstDatabase");
        const collection = db.collection('users');

        const findResult = await collection.find({}).toArray();
        console.log('Found documents =>', findResult);
}

app.all('/*', function (req, res) {
    // When this callback function is called, send this to client
    res.send('Hello World :3');
});

main()
    .then(console.log('test'))
    .catch((error) => console.log(error));
