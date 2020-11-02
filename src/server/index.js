// Setup empty JS object to act as endpoint for all routes
let projectData = [];

// Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express();

/* Dependencies */
var path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const { url } = require('inspector');
const { Console } = require('console');
var async  = require('express-async-await')
var fetch = require('node-fetch');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'))

// Setup Server
app.listen(3000, () => {
    console.log(`Server up => Try port 3000`)
})
// :::::: Routes ::::::

app.post('/newEntry', postEntry);

function postEntry(req, res) {

    //TODO save entry at somewhere
  let newEntry = {
    task: req.body.task,
    day: req.body.day
  } 

  //projectData.push(newEntry);
  res.send(newEntry);
}