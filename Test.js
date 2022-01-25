var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.send('Hello World!\n');
});

var port = process.env.PORT||3000;
app.listen(port, console.log('Server listening at ' + port));