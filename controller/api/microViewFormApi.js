
const fs = require('fs');
const path = require("path");
const http = require('http');

//get suburbs name 
var obj = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../locations.json"), 'utf8'));
var o = JSON.stringify(obj[0]);

var suburbs = [];
for (var i = 0;i < obj.length; i++) {
	var suburb = obj[i].SuburbName;

	if (!suburbs.includes(suburb)){
		suburbs.push(suburb);
	}
}

suburbs.sort();

module.exports.microViewFormApi = function(req, res) {
	var suburbName = req.body.suburb_name;

	// console.log(suburbName);
	var location = [];
	for (var i = 0;i < obj.length;i++) {
		var suburbNameTmp = obj[i].SuburbName;
		if (suburbName == suburbNameTmp) {		
			location.push(obj[i].GPSLat);
			location.push(obj[i].GPSLong);
			break;
		}
	}

	res.send('{"location" : [' + location + ']}');
}


module.exports.getAllStopIdInSuburb = function(req, res) {
	var suburb = req.body.suburbName;

	var stopLocation = [];
	for (var i = 0;i < obj.length;i++) {
		var suburbNameTmp = obj[i].SuburbName;
		if (suburb == suburbNameTmp) {
			var loc = [];
			loc.push(obj[i].GPSLat);
			loc.push(obj[i].GPSLong);
			loc.push(obj[i].StopLocationID);
			loc.push(obj[i].StopNameShort);
			stopLocation.push(loc);
		}
	}

	res.send('{"locations" : ' + JSON.stringify(stopLocation) + '}');
}