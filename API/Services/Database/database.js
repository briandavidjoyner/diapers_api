var	Promise = require('promise');
var mongoose = require ('mongoose');
var username = process.env.MONGODB_USER;
var password = process.env.MONGODB_PASSWORD;
var dbName = process.env.MONGODB_DATABASE || 'datastore';
var dbLocal = process.env.dbLocal || '@127.0.0.1:27017/';
var db;

//Uses Environmentals To Determine DB Local
console.log('mongodb://' + username + ':' + password + dbLocal + dbName);
var url = 'mongodb://' + username + ':' + password + dbLocal + dbName;

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

//Use Promises Library
mongoose.Promise = require('promise');
//clearassert.equal(exports.exec().constructor, require('promise'));  Issues with this from Mongoose docs

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
			_sort(result).then(function(result){
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

function _sort = function(dataIn){
	return new Promise(function(resolve,reject){
		console.log('sorting');
		var dataIn = dataIn
			dataIn.sort(
				function compare(a, b) {
				  	if (a.pricePerUnit < b.pricePerUnit)
		 			{
				    	return -1;
				  	}
					if (a.pricePerUnit > b.pricePerUnit) {
					  	return 1;
					} else
					  // a must be equal to b
					  return 0;
					}
			);
		resolve(dataIn);
	});
	
}

