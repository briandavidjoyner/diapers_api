var	Promise = require('promise');
var mongoose = require ('mongoose');
var username = process.env.MONGODB_USER;
var password = process.env.MONGODB_PASSWORD;
var dbName = process.env.MONGODB_DATABASE;
var db;

//Comment Out For Production -
var url = 'mongodb://' + username + ':' + password + '@mongodb:27017/datastore';  //Only works on hst
//var url = 'mongodb://' + username + ':' + password + '@127.0.0.1:27017/' + dbName;  //Works locally

//Schema
var itemSchema = mongoose.Schema({
	type: {type: String, required: true},
	title: {type: String, required: false},
	vendor: {type: String, required: true},
	title: {type: String, required: true},
	brand: {type: String, required: true},
	url: {type: String, required: true},
	image: {type: String, required: true},
	price: {type: String, required: true},
	units: {type: String, required: true},
	pricePerUnit: {type: String, required: true},
	size: {type: String, required: true}
});

//Create DB Model
var item = mongoose.model('item', itemSchema);

// Connect using MongoClient
mongoose.connect(url, { useMongoClient: true }).then(function(){
	console.log('db connection established');
	var start = require('../Lookups/interval.js');
	db = mongoose.connection;
}).catch(function(err){
	console.log(err);
});

//Status
exports.status = function(){
	return new Promise(function(resolve,reject){
		if (db._readyState == 1){
			resolve ({
				status:db._readyState,
				states: db.states
			});
		} else {
			reject ('database is not connected');
		}
	});
}

//Add Items
exports.addItems = function(items){
	return new Promise (function(resolve,reject){
		item.insertMany(items, ordered = true).then(function(result){
			resolve (result);
		}).catch(function(err){
			reject (err);
		});
	});
}

//Find Items
exports.findItems = function(query){
	return new Promise (function(resolve,reject){
		item.find(query).then(function(result){
			resolve (result);
		}).catch(function(err){
			reject(err);
		});
	});
}

exports.distinct = function(field,query){
	return new Promise (function(resolve,reject){
		item.distinct(field,query).then(function(result){
			resolve (result);
		}).catch(function(err){
			reject(err);
		});
	});
}

//Remove Items
exports.removeItems = function(query){
  	return new Promise(function(resolve,reject){
    	item.remove(query).then(function(result){
        	resolve(result);
      	}).catch(function(err){
        	reject (err);
      	});
  	});
}