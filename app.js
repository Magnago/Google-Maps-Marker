var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/DatabaseProject", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var coordinatesSchema = new mongoose.Schema({
    lat: Number,
    lng: Number
 });

var coordinates = mongoose.model("Coordinate", coordinatesSchema);

app.get("/map", function(req, res){
    res.render("index.ejs");
});

//CREATE - add new coordinate to DB
app.post("/map", function(req, res){
    // get data from form 
    var lat = req.body.lat;
    var lng = req.body.lng;
    var newCoordinate = {lat: lat, lng: lng};
    // Create a new coordinates and save to DB
    coordinates.create(newCoordinate, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log("Coordinate saved");
            console.log(newlyCreated);
        }
    });
});

//Table - show all coordinates
app.get("/table", function(req, res){
    // Get all coordinates from DB
    coordinates.find({}, function(err, allCoordinates){
       if(err){
           console.log(err);
       } else {
          res.render("table.ejs",{coords:allCoordinates});
       }
    });
});

app.listen(3000, process.env.IP, function(){
    console.log("Server started!");
 });