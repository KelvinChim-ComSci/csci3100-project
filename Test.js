var express = require("express");
var app = express();


app.get('/', function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/plain'});

    response.end('Hello World\n');
});

app.listen(8000, console.log('Server running at http://127.0.0.1:8000/'));