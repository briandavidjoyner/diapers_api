var	Promise = require('promise');
var MongoClient = require('mongodb').MongoClient;
var test = require('assert');
var username = process.env.MONGODB_USER;
var password = process.env.MONGODB_PASSWORD
// Connection url
//var url = 'mongodb://localhost:27017/test';
var url = 'mongodb://' + username + ':' + password + '@]mongodb:27017/datastore';
// Database name
const dbName = 'Datastore';
// Connect using MongoClient
exports.action = function(){
	new Promise (function(resolve,reject){
		// Action 
		MongoClient.connect(url, function(err, client) {
			if (err){
				assert.equal(null, err);
				reject (err);
			} else {
				const db = client.db(dbName);
				client.close();
				resolve ('Database ' + dbName + ' was resolved');
			}
		});
	});
}