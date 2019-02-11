// ----- Dependancies
var express = require("express");
var mongoose = require("mongoose");
var EHB = require("express-handlebars");
var bodyParser = require ("body-parser");


//port set up to listen on host's port or port 3000
 var PORT = process.env.PORT ||3000;

 //Start the Express App
 var app = express ();




 //Setup  Express Router
  var router = express.Router();

  require("./config/routes")(router);

  //Mark public folder as static Directory
  app.use(express.static(__dirname + "/public"));

  //app handelbars to the app 
  app.engine("handelbars", EHB({
    defaultLayout: "main"
  }));


  //use bodyparser in the app
app.use (bodyParser.urlencoded ({
    extended: false
}));
  
  app.use (router);

  // If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the Mongo DB 
mongoose.connect(db, function(error){
//also console log any errors if present
    if (error){
    console.log(error);
}
//or show message
else {
    console.log ("mongoose connection is successful")
}
});


  //Listen on the port will display "Listing on port" if working 
  app.listen(PORT, function() {
console.log ("Listing on port:" + PORT);

  });