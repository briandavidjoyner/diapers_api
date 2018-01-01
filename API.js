var express = require('express');
var router_API = express.Router([options]);
var options;
var	Promise = require('promise');

//APIs
var mailchimp = require('./API/Services/Mail/mailchimp.js');
var database = require('./API/Services/Database/database.js');
var amazon = require('./API/Services/Lookups/Amazon/amazon.js');
var walmart = require('./API/Services/Lookups/Walmart/walmart.js');
var standardize = require('./API/Services/Lookups/Lookup.js').standardize;

//////////////////////////////////////////
//Email API///////////////////////////////
//////////////////////////////////////////

router_API.get('/subscribe/:email/:size/:brand', function(req, res){
	mailchimp.subscribe(req.params.email,req.params.size,req.params.brand).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});


//////////////////////////////////////////
//For Testing/////////////////////////////
//////////////////////////////////////////

router_API.get('/db/test/status', function(req,res){
	database.status().then(function(result){
		res.json(result);
	}).catch(function(err){
		res.send(err);
	});
});

router_API.get('/db/test/add', function(req,res){
	database.addItems({
		type: 'test item',
		vendor: 'test vendor',
		title: 'test title',
		brand: 'test brand',
		url: 'test url',
		image: 'test image url',
		price: 'test price',
		units: 'test unit',
		pricePerUnit: 'test price-per-unit',
		size: 'test size'
	}).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});

router_API.get('/db/test/find', function(req,res){
	database.findItems({type:'test item'}).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
})

router_API.get('/db/test/remove', function(req,res){
	database.removeItems({type:'test item'}).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});

//router_API.get('/db/test/amazon/add', function(req,res){
//	var addItems = require('./API/Services/Lookups/interval.js');
//	addItems.toDB('amazon','diapers','huggies',1).then(function(result){
//		res.send(result);
//	}).catch(function(err){
//		res.send(err);
//	});
//});

//////////////////////////////////////////
//Amazon API//////////////////////////////
//////////////////////////////////////////

router_API.get('/amazon/diapers/:brand/:page', function(req,res){
	amazon.diaperlookup(req.params.brand,req.params.page).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});

router_API.get('/amazon/diapers/standarized/:brand/:page', function(req,res){
	standardize('amazon','diapers',req.params.brand,req.params.page).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});

//To Build 12.27.2017
//router_API.get('/amazon/diaperwipes/:brand/:page', function(req,res){
//	amazon.diaperwipeslookup(req.params.brand,req.params.page).then(function(result){
//		res.send(result);
//	}).catch(function(err){
//		res.send(err);
//	});
//});

//////////////////////////////////////////
//Walmart API/////////////////////////////
//////////////////////////////////////////

router_API.get('/walmart/diapers/:brand/:page', function(req,res){
	walmart.diaperlookup(req.params.brand,req.params.page).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});

//////////////////////////////////////////
//Dababase Queries////////////////////////
//////////////////////////////////////////

router_API.get('/db/finditemsbytype/:type', function(req,res){
	database.findItems({
		type: req.params.type
	}).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});

module.exports = router_API;