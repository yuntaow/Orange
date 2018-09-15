
const fs = require('fs');
const path = require("path");

module.exports.home = function(req, res) {
	var obj = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../locations.json"), 'utf8'));
	var o = JSON.stringify(obj[0]);

	var suburbs = [];
	for (var i = 0;i < obj.length; i++) {
		var suburb = obj[i].SuburbName;

		if (!suburbs.includes(suburb)){
			suburbs.push(suburb);
		}
	}

	suburbs.sort();

	res.render('Home', {o:o, suburbs:suburbs});
}