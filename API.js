var express = require('express');
var	Promise = require('promise');
var router_API = express.Router([options]);
var options;

//APIs
var mailchimp = require('./API/Services/Mail/mailchimp.js');
var database = require('./API/Services/Database/database.js');

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
	database.status().then(function(result){
		res.json(result);
	}).catch(function(err){
		res.send(err);
	});
});

//For Unit Tests
router_API.get('/db/additem/:item', function(req,res){
	database.addItems({
		type: req.params.item,
		price: 32
	}).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
})

module.exports = router_API;