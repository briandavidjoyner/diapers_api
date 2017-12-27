var express = require('express');
var router_API = express.Router([options]);
var options;
var	Promise = require('promise');

//APIs
var mailchimp = require('./API/Services/Mail/mailchimp.js');
var database = require('./API/Services/Database/database.js');
var amazon = require('./API/Services/Lookups/Amazon/amazon.js');
var walmart = require('./API/Services/Lookups/Walmart/walmart.js');
var standarize = require('./API/Services/Lookups/Lookup.js').output;

//Email API
router_API.get('/subscribe/:email/:size/:brand', function(req, res){
	mailchimp.subscribe(req.params.email,req.params.size,req.params.brand).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});

//
router_API.get('/db', function(req,res){
	database.status().then(function(result){
		res.json(result);
	}).catch(function(err){
		res.send(err);
	});
});

				//For Testing
				router_API.get('/db/additem/:item', function(req,res){
					database.addItems({
						type: req.params.item,
						price: 32
					}).then(function(result){
						res.send(result);
					}).catch(function(err){
						res.send(err);
					});
				});

				router_API.get('/amazon/diapers/:brand/:page', function(req,res){
					amazon.diaperlookup(req.params.brand,req.params.page).then(function(result){
						res.send(result);
					}).catch(function(err){
						res.send(err);
					});
				});

								router_API.get('/amazon/diapers/standarized/:brand/:page', function(req,res){
									standarize(req.params.brand,req.params.page).then(function(result){
										res.send(result);
									}).catch(function(err){
										res.send(err);
									});
								});


				router_API.get('/amazon/diaperwipes/:brand/:page', function(req,res){
					amazon.diaperwipeslookup(req.params.brand,req.params.page).then(function(result){
						res.send(result);
					}).catch(function(err){
						res.send(err);
					});
				});

				router_API.get('/walmart/diapers/:brand/:page', function(req,res){
					walmart.diaperlookup(req.params.brand,req.params.page).then(function(result){
						res.send(result);
					}).catch(function(err){
						res.send(err);
					});
				});


//Find Items
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