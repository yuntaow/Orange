//s3://melb-datathon/SAMPLE
//s3://aws-athena-query-results-212256055900-ap-southeast-2/

const express = require('express');
const router = express.Router();
/*
const js = require('fs');

const AWS = require('aws-sdk');
AWS.config.loadFromPath('./credentials.json');

const athena = new AWS.Athena();
*/



const athena = require('athena-client');
var config = {
    accessKeyId: 'AKIAJSIURMB2HEFLRZXA',
    secretAccessKey: '/6IDoTJKzNevaJjpkZV3p46k64IuOu1ubOc+oaRR',
    region: 'ap-southeast-2',
}
var clientConfig = {
    bucketUri: 's3://melb-datathon/SAMPLE/Samp_0/'
}
var client = athena.createClient(clientConfig, config)


router.get('/', function(req, res) {
	
	client.execute('SELECT * from samp_0 LIMIT 10', function(err, data) {
	    if (err) {
	        return console.error(err)
	    }
	    res.send(data)
	})
	
	// res.send("aws test");
});



module.exports = router;

/*
	Athena 的 api 不知道怎么用
	run 的时候报很多错，可能是权限的问题？？ 不能访问 melb-datathon 的 s3 bucket ??
*/