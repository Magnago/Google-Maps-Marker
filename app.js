const express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/DatabaseProject", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// SCHEMA SETUP
const coordinatesSchema = new mongoose.Schema({
	lat: Number,
	lng: Number
});

const coordinates = mongoose.model("Coordinate", coordinatesSchema);

// app.get("/", function(req, res){
//     res.render("index.ejs");
// });
app.get("/", (req, res) => res.render("index.ejs"));

//CREATE - add new coordinate to DB
app.post("/", function (req, res) {
	// get data from form
	const lat = req.body.lat;
	const lng = req.body.lng;
	const newCoordinate = { lat: lat, lng: lng };
	// Create a new coordinates and save to DB
	coordinates.create(newCoordinate, (err, newlyCreated) => {
		if (err)
		{
			console.log(err);
		} else
		{
			console.log("Coordinate saved");
			console.log(newlyCreated);
		}
	});
});

//Table - show all coordinates
app.get("/table", (req, res) => {
	// Get all coordinates from DB
	coordinates.find({}, (err, allCoordinates) => {
		!!err ? console.log(err)
			: res.render("table.ejs", { coords: allCoordinates });
	});
});

app.listen(3000, process.env.IP, function () {
	console.log("Server listening in port : 3000");
});
