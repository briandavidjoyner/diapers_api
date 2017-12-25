var express = require('express');
var	Promise = require('promise');
var router_API = express.Router([options]);
var options;
var mailchimp = require('./API/Services/Mail/mailchimp.js');
var database = require('./API/Services/Database/database.js');
var db_sample = require('./API/Services/Database/sample.js');

router_API.get('/route1', function(req, res) {
    res.send('OMG... Google Cloud Kinda Rules, But Openshift Isn\'t awful...'); 
});

router_API.get('/mail/subscribe/:email/:size/:brand', function(req, res){
	mailchimp.subscribe(req.params.email,req.params.size,req.params.brand).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});

router_API.get('/db', function(req,res){
	/* database.status().then(function(data){
		res.send({result: data});;
	}).catch(function(err){
		res.send(err);
	}); */
	res.send(database.status)
});

router_API.get('/db/sample.json', function(req,res){
	res.send(db_sample.sample);
});

//router_API.get('/addItem', function(req,res){
//	database.createItem('cat').then(function(result){
//		res.send(result);
//	}).catch(function(err){
//		res.send(err);
//	});
//});

module.exports = router_API;