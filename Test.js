var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.get('/', function (req, res) {
    res.send('Hello World!\n');
});

app.listen(8000, console.log('Server running at http://127.0.0.1:8000/'));