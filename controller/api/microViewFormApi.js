
const fs = require('fs');
const path = require("path");
const http = require('http');
var querystring = require('querystring');

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

module.exports.getScanOnStopCount = function(req, res) {
	var stopID = req.body.stopid;
	var month = req.body.mon;

	var dataList = []; 

	var post_data = JSON.stringify({
		"location" : stopID.toString(),
		"time" : month
	});

	var test_data = {
		"location" : stopID.toString(),
		"time" : month
	}

	var post_options = {
      host: '54.206.21.80',
	  port: 5001,
	  path: '/api/micro/scan/',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(post_data)
      }
    };

    var post_req = http.request(post_options, function(resd) {
      resd.setEncoding('utf8');
      resd.on('data', function (chunk) {
      		// console.log("success post request");
          // console.log('Response: ' + chunk);
          dataList += chunk
      });
      resd.on('error', (err) => {
	    console.error(err);
	  });
	  resd.on('end', function() {
	  	// console.log("finished");
	  	res.send(JSON.stringify(dataList));
	  })
    });

    post_req.write(post_data);
    post_req.end();

}