var	Promise = require('promise');
var mongoose = require ('mongoose');
var username = process.env.MONGODB_USER || 'l4HtCfx7b3c3hcuN';
var password = process.env.MONGODB_PASSWORD || 'l4HtCfx7b3c3hcuN';
var dbName = process.env.MONGODB_DATABASE || 'datastore';

//Comment Out For Production
//var url = 'mongodb://' + username + ':' + password + '@mongodb:27017/datastore';
var url = 'mongodb://' + username + ':' + password + '@127.0.0.1:27017/' + dbName;

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

//
exports.status = function(){
	return new Promise (function(resolve,reject){
		resolve (mongoose.connection);
	}).catch(function(err){
		reject (err);
	});
}

exports.createItem = function(itemData){
	if (itemData) {
		new item({name:itemData.name});
	} else throw new Error('itemData is incomplete');
}
