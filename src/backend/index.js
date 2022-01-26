const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://aua:3100ouo@cluster0.x9iai.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log("Connected database!")
    // perform actions on the collection object
    client.close();
});