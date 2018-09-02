const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Chart = require('chart.js');

const hello = require('./routes/api/hello');
// const athenadata = require('./routes/api/athenadata');

var db = mongoose
	.connect('mongodb://alan:admin@127.0.0.1:27017/datathon2018')
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err));

const app = express();

//Body parser middleware
app.use(bodyParser.json());
//set view engine
app.set('view engine', 'ejs');

const testDataSchema = new Schema({
	col0 : Number,
	col1 : String,
	col2 : String,
	col3 : Number,
	col4 : Number,
	col5 : Number,
	col6 : String,
	col7 : Number,
	col8 : Number,
	partition_0 : String,
	partition_1 : Number,
	partition_2 : String
});
var t = mongoose.model('testData201705scanonSamp0', testDataSchema, 'testData201705scanonSamp0');

app.use('/api/hello', hello);
// app.use('/api/athenadata', athenadata);
app.get('/testData', function(req, res) {
	t.findOne()
		.then(i => res.send(i))
});

app.get('/testChart', function(req, res) {
	var d = new Date(2017, 4, 1);
	// var s = d.toString();
	// var d2 = d;
	// d2.setDate(d.getDate() + 1);
	// var s2 = d2.toString();

	var tmp_list = [];

	// for (var i = 1;i <= 1;i++) {
	var s = ['2017-05-01', '2017-05-02', '2017-05-03', '2017-05-04', '2017-05-05', '2017-05-06', '2017-05-07', '2017-05-08', '2017-05-09', '2017-05-10',
			 '2017-05-11', '2017-05-12', '2017-05-13', '2017-05-14', '2017-05-15', '2017-05-16', '2017-05-17', '2017-05-18', '2017-05-19', '2017-05-20',
			 '2017-05-21', '2017-05-22', '2017-05-23', '2017-05-24', '2017-05-25', '2017-05-26', '2017-05-27', '2017-05-28', '2017-05-29', '2017-05-30', '2017-05-31']
	
	Promise.all([
		t.count({col1 : s[0]}), t.count({col1 : s[1]}), t.count({col1 : s[2]}), t.count({col1 : s[3]}), t.count({col1 : s[4]}),
		t.count({col1 : s[5]}), t.count({col1 : s[6]}), t.count({col1 : s[7]}), t.count({col1 : s[8]}), t.count({col1 : s[9]}),
		t.count({col1 : s[10]}), t.count({col1 : s[11]}), t.count({col1 : s[12]}), t.count({col1 : s[13]}), t.count({col1 : s[14]}),
		t.count({col1 : s[15]}), t.count({col1 : s[16]}), t.count({col1 : s[17]}), t.count({col1 : s[18]}), t.count({col1 : s[19]}),
		t.count({col1 : s[20]}), t.count({col1 : s[21]}), t.count({col1 : s[22]}), t.count({col1 : s[23]}), t.count({col1 : s[24]}),
		t.count({col1 : s[25]}), t.count({col1 : s[26]}), t.count({col1 : s[27]}), t.count({col1 : s[28]}), t.count({col1 : s[29]}),
		t.count({col1 : s[30]})
	]).then(function(value) {
		res.render('testChart', {d : value});
	})

});

app.get('/', function(req, res) {
	res.render('home');
});

//server static assets
if (process.env.NODE_ENV === 'production') {
	//set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


