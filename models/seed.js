////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const mongoose = require("./connection")
const Team = require("./team")

////////////////////////////////////////////
// Seed Code
////////////////////////////////////////////

  mongoose.connection.on("open", () => {
    // Run database queries in this function
  
    // create array of starter
    const startTeams = [
      {name: "Golden State Warriors", rings: "5", logo: "https://cdn.nba.com/logos/nba/1610612744/primary/L/logo.svg", bestPlayer: "Steph Curry", confernce: "western"},
      {name: "Los Angeles Lakers", rings: "17", logo: "https://cdn.nba.com/logos/nba/1610612747/primary/L/logo.svg", bestPlayer: "Kareen Abdul Jabaur", confernce: "western"},
      
    ];
  
    // Delete all fruits
    Team.deleteMany({}, (err, data) => {
        //seed starter fruits
        Team.create(startTeams, (err, data) => {
            console.log("-------TEAMS CREATED---------")
            console.log(data)
            console.log("-------TEAMS CREATED---------")
            mongoose.connection.close();
        })
  
  
    })
  });