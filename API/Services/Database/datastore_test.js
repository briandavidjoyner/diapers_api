var	Promise = require('promise');
var MongoClient = require('mongodb').MongoClient;
var test = require('assert');
var username = process.env.MONGODB_USER;
var password = process.env.MONGODB_PASSWORD
var dbName = 'Datastore';
var url = 'mongodb://' + username + ':' + password + '@mongodb:27017/datastore';
// Connect using MongoClient
MongoClient.connect(url, function(err, client) {
	if (err){
		console.log (err);
	} else if (client){
		console.log (client);
		const database = client.db(dbName);
	}
});

//Database Methods
exports.getDB = function(){
	return new Promise(function(resolve,reject){
		resolve (database);
	});
}