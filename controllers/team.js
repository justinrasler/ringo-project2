////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Team = require("../models/team")

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router()


////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
    if (req.session.loggedIn) {
      next();
    } else {
      res.redirect("/user/login");
    }
  });
/////////////////////////////////////////
// Routes
/////////////////////////////////////////
// Seed route
router.get('/seed', (req, res)=> {
    // array of starter chocolate
    const startTeams = [
      {name: "Golden State Warriors", rings: "5", logo: "https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg", bestPlayer: "Steph Curry"},
      {name: "Los Angeles Lakers", rings: "17", logo: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg", bestPlayer: "Kareen Abdul Jabaur"},

    ]
    
    // Delete all choco
    Team.remove({}, (err, data) => {
      // Seed Starter Choco
      Team.create(startTeams,(err, data) => {
        // send created choco as response to confirm creation
        res.json(data);
      }
      );
    });
    
    });
// Index Route (Get => /list)
router.get("/", (req, res) => {
    Team.find({username: req.session.username}, (err, teams) => {
      res.render("teams/index.ejs", { teams });
    });
  });
  
  // New route
  router.get("/new", (req, res) => {
    res.render("teams/new.ejs")
  })
  
  
  
  // Create Route (POST => /choco)
  router.post("/", (req, res) => {
    // add username to req.body to track related user
  req.body.username = req.session.username
  // Create the Chocolate!
    Team.create(req.body, (err, team) => {
        // redirect the user back to the main fruits page after fruit created
        res.redirect("/teams")
    })
  })
  
  // Edit  Route
  // (GET => /fruits/:id/edit)
  router.get("/:id/edit", (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the chocolate from the database
    Team.findById(id, (err, team) => {
        // render template and send it fruit
        res.render("teams/edit.ejs", {team})
    })
  })

  // Update Route, (PUT => /choco/:id)
  router.put("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    
    // update the chocolate
    Team.findByIdAndUpdate(id, req.body, {new: true}, (err, team) => {
        // redirect user back to main page when chocolate updates 
        res.redirect("/teams")
    })
  })
  
  // Destroy (Delete => /choco/:id)
  router.delete("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
    // delete the chocolate
   Team.findByIdAndRemove(id, (err, team) => {
        // redirect user back to index page
        res.redirect("/teams")
    })
  })
  
  // Show route
  router.get("/:id", (req, res) => {
    // get the id from params
    const id = req.params.id
  
    // find the particular fruit from the database
    Team.findById(id, (err, team) => {
        // render the template with the data from the database
        res.render("teams/show.ejs", {team})
    })
  })    

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;