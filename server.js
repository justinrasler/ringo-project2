require('dotenv').config();

//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride = require('method-override');
const teams = require('./models/teams')
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true}
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000

//index route
app.get('/teams' , (req, res) => {
  res.render('index.ejs', {allTeams: teams});
});

//new route
app.get('/teams/new', (req,res) => {
  res.render('new.ejs')
});

//create route
app.post('/teams', (req,res) => {
  teams.push(req.body)
  // redirect (get) to /teams
  res.redirect("/teams")
  console.log(req.body)
})
//delete route
app.delete('/teams/:indexOfTeamsArray', (req,res) => {
teams.splice(req.params.indexOfTeamsArray,1);
res.redirect('/teams')
})

//Edit route
app.get('/teams/:indexOfTeamsArray/edit', (req,res) => {
  res.render('edit.ejs', {
    team: teams[req.params.indexOfTeamsArray],
    index: req.params.indexOfTeamsArray
  })
})
//update route
app.put('/teams/:indexOfTeamsArray', (req,res) => {
  teams[req.params.indexOfTeamsArray] = req.body;
  res.redirect('/teams')
})

//show route
app.get('/teams/:indexOfTeamsArray', (req,res) => {
res.render('show.ejs', {team: teams[req.params.indexOfTeamsArray]})
})

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('express is listening on:', PORT));