const fs = require('fs');
const path = require("path");
const http = require('http');

//get suburbs name 
var obj = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../locations.json"), 'utf8'));
var o = JSON.stringify(obj);

var suburbs = [];
for (var i = 0;i < obj.length; i++) {
	var suburb = obj[i].SuburbName;

	if (!suburbs.includes(suburb)){
		suburbs.push(suburb);
	}
}

suburbs.sort();

module.exports.showMapbox = function(req, res) {


	//get data from remote server

	var dataList = []; 

	var options = {
	  host: '54.206.21.80',
	  port: 5000,
	  path: '/',
	  method: 'GET'
	};

	http.request(options, function(resd) {
	  // console.log('STATUS: ' + resd.statusCode);
	  // console.log('HEADERS: ' + JSON.stringify(resd.headers));
	  resd.setEncoding('utf8');
	  resd.on('data', function (chunk) {
	    // console.log('BODY: ' + chunk);
	    // res.render('mapbox', {d : chunk});
	    dataList += chunk
	  });

	  resd.on('end', function() {
	  	// console.log("finished");
	  	res.render('mapbox', {dl : dataList, suburbs : suburbs, o : o});
	  })
	}).end();
}



module.exports.microViewForm = function(req, res) {
	/*
		form, how to stay in the same page
		ajax? 
	*/
	try{
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

		console.log(location);

		// res.end("finished");
		res.end();
	} catch (e) {
		res.end(e.message || e.toString());
	}

}





// var objMsg = <%-JSON.stringify(obj)%>;
// 			var objO = JSON.parse(objMsg);
// 			console.log(objO[0]);