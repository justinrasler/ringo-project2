
require("dotenv").config() // load env vars
const express = require('express');
const morgan = require("morgan") //import morgan
const methodOverride = require('method-override');
const TeamRouter = require('./controllers/team')
const UserRouter = require('./controllers/user')
const session = require('express-session');
const MongoStore = require('connect-mongo');






const app = express()

//___________________
//Middleware
//___________________
app.use(morgan("tiny")) //logging
//use method override
app.use(methodOverride('_method'));


// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings; gets req.body
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(express.static("public")); // serve files from public statically
app.use(session({
  secret: process.env.SECRET,
  store: MongoStore.create({mongoUrl: process.env.MONGODB_URI}),
  saveUninitialized: true,
  resave: false,
}))

app.use("/user", UserRouter)
app.use("/teams", TeamRouter)

//___________________
// Routes
//___________________

//localhost:3000

app.get("/", (req, res) => {
  res.render("index.ejs")
});



//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('express is listening on:', PORT));