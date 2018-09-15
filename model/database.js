
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var db = mongoose
	.connect('mongodb://alan:admin@127.0.0.1:27017/datathon2018')
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err));



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

mongoose.model('testData201705scanonSamp0', testDataSchema, 'testData201705scanonSamp0');

