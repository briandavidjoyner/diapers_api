var	Promise = require('promise');
var mongoose = require ('mongoose');
var username = process.env.MONGODB_USER || 'l4HtCfx7b3c3hcuN';
var password = process.env.MONGODB_PASSWORD || 'l4HtCfx7b3c3hcuN';
var dbName = 'Datastore';

//Comment Out For Production
var url = 'mongodb://' + username + ':' + password + '@mongodb:27017/datastore';
//var url = 'mongodb://' + username + ':' + password + '@mongodb-diapers-api.193b.starter-ca-central-1.openshiftapps.com/datastore';

// Connect using MongoClient
mongoose.connect(url, { useMongoClient: true });

//On Connection Create A New Schema
var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(result) {
  		console.log('connected: ' + result);
	});

exports.status = function(){
	return new Promise (function(resolve,reject){
		resolve (mongoose.connection);
	}).catch(function(err){
		reject (err);
	});
}
