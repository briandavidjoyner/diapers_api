var	Promise = require('promise');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var username = process.env.MONGODB_USER;
var password = process.env.MONGODB_PASSWORD
var dbName = 'Datastore';
var url = 'mongodb://' + username + ':' + password + '@mongodb:27017/datastore';
// Connect using MongoClient
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  db.close();
});