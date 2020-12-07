let userloged = "";

const fs = require("fs");
// Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express();

/* Dependencies */
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors');
const { url } = require('inspector');
const { Console } = require('console');
const async  = require('express-async-await')
const fetch = require('node-fetch');

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
    "taskname": req.body.taskname,
    "isFinish": req.body.isFinish
  } 

  //projectData.push(newEntry);
  for (users of projectData[0].data){
    if(users.username == userloged){
      users.tasks.push(newEntry);
    }
  }
  res.send(newEntry);
}



let projectData = [];

app.get('/loadData', loadData);

function loadData (req, res) {

  if( projectData.length == 0 ){
    let file = fs.readFile("./src/server/login.json" , "utf8", function(err, data){
      if(err){
        return console.log(err);
      }
      projectData.push(JSON.parse(data));
      res.send(projectData); // faz o parse para json
    });
  }
}

app.get('/login', login);

function login (req, res) {
  for (const users of projectData[0].data){
    if(users.username == req.query.email && users.password == req.query.password){
      res.send(users.tasks);
      userloged = users.username;
      return;
    }
  }
  res.send(false);
}

app.get('/loged', (req, res) => {
  res.send( userloged == ""  ? false : true);
})


app.post('/deleteCard', function (req, res) {
  const boolFinish = req.query.isFinish == 'false'? false : true;
  for (const users of projectData[0].data){
    if(users.username == userloged){
      for (const task of users.tasks){
        if(task.taskname == req.query.taskname && task.isFinish == boolFinish){
          const index = users.tasks.findIndex( (element) => element == task);
          users.tasks.splice(index, 1);
          return;
        }
      }
    }
  }
})

app.get('/attIsFinish', (req, res) => {
  for (const users of projectData[0].data){
    if(users.username == userloged){
      for (const task of users.tasks){
        if(task.taskname == req.query.taskname){
          task.isFinish = !task.isFinish;
          return;
        }
      }
    }
  }
})

app.get('/saveJson', (req, res) => {
  const data = JSON.stringify(projectData[0]);

  // write JSON string to a file
  console.log("Saving data ...");
  fs.writeFile('src/server/login.json', data, (err) => {
      if (err) {
          throw err;
      }
    console.log("JSON data is saved.");
  });
  userloged = "";
})