var	Promise = require('promise');
var mongoose = require ('mongoose');
var username = process.env.MONGODB_USER;
var password = process.env.MONGODB_PASSWORD;
var dbName = process.env.MONGODB_DATABASE || 'datastore';
var dbMethods;

//Comment Out For Production
//var url = 'mongodb://' + username + ':' + password + '@mongodb:27017/datastore';  //Only works on hst
var url = 'mongodb://' + username + ':' + password + '@127.0.0.1:27017/' + dbName;  //Works locally

//Schema
var itemSchema = mongoose.Schema({
	itemType: String,
	Title: String
});

//Create DB Model
var item = mongoose.model('item', itemSchema);

// Connect using MongoClient
mongoose.connect(url, { useMongoClient: true });

//On Connection Create A New Schema
var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function() {
  		console.log('db connected');
	});

//Methods
exports.status = function(){
	return new Promise(function(resolve,reject){
		if (db._readyState == 1){
			resolve ({
				status:db._readyState,
				states: db.states
			});
		} else {
			reject ('does not exist');
		}
	});
}
