var	Promise = require('promise');
var mongoose = require ('mongoose');
var assert = require('assert');
var username = process.env.MONGODB_USER || 'l4HtCfx7b3c3hcuN';
var password = process.env.MONGODB_PASSWORD || 'l4HtCfx7b3c3hcuN';
var dbName = 'Datastore';
var url = 'mongodb://' + username + ':' + password + '@mongodb:27017/datastore_test';

// Connect using MongoClient
mongoose.connect(url, { useMongoClient: true });

exports.status = function(){
	return new Promise (function(resolve,reject){
		resolve (mongoose.connection);
	}).catch(function(err){
		reject (err);
	});
}
