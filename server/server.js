const express = require('express');
var bodyParser = require('body-parser');

const Validator = require('./logic/Validator.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.send('Server is working');
})

app.post('/game', function onGameDataReceive(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // console.log(req.body);
  Validator.manageGame(req.body, function(gameID) {

    console.log(req.body.data);
    gameID = gameID.toString();
    res.send(gameID);
  });
})

// Launch server
const port = 8000;
app.listen(port, () => { console.log(`Server listening to port ${port}`)})
