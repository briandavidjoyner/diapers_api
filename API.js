var express = require('express');
var router_API = express.Router([options]);
var options;
var	Promise = require('promise');

//APIs
var mailchimp = require('./API/Services/Mail/mailchimp.js');
var twilio = require('./API/Services/Twilio/twilio.js');
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

router_API.get('/emailreport', function(req, res){
	mailchimp.report().then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});

router_API.get('/emailreports', function(req, res){
	mailchimp.reports().then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});

//////////////////////////////////////////
//Twilio API///////////////////////////////
//////////////////////////////////////////

router_API.get('/sms/message/:phone', function(req, res){
	twilio.twilio(req.params.phone).then(function(result){
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

router_API.get('/amazon/diapers/clean/:brand/:page', function(req,res){
	amazon.diaperlookup(req.params.brand,req.params.page).then(function(result){
		return amazonClean.clean('diapers', result);
	}).then(function(result){	
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
	var type = req.params.type;
	//var brand = req.params('brand');
	//var size = req.params('size');
	database.findItems({
		$and: [ 
			{ type: { $eq: type } }, 
			//{ pricePerUnit: { $gt: 0 } }
			{ units: { $ne: NaN } }
		]

	//database.findItems({
	//	type: req.params.type
	}).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});

router_API.get('/db/finditemsbytypebrandsize/:type/:brand/:size', function(req,res){
	var type = req.params.type;
	var brand = req.params.brand;
	var size = req.params.size;
	database.findItems({
		$and: [ 
			{ type: { $eq: type } }, 
			{ brand: { $eq: brand}},
			{ size: {$eq: size}},
			{ units: { $ne: NaN } }
		]
	}).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});

router_API.get('/db/finditemsbytypeandsize/:type/:size', function(req,res){
	var type = req.params.type;
	var size = req.params.size;
	database.findItems({
		$and: [ 
			{ type: { $eq: type } }, 
			{ size: {$eq: size}},
			{ units: { $ne: NaN } }
		]
	}).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});

router_API.get('/db/finditemsbytypeandbrand/:type/:brand', function(req,res){
	var type = req.params.type;
	var brand = req.params.brand;
	database.findItems({
		$and: [ 
			{ type: { $eq: type } }, 
			{ brand: { $eq: brand}},
			{ units: { $ne: NaN } }
		]
	}).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});


router_API.get('/db/findsizesbytype/:type', function(req,res){
	database.distinct('size',{
		type: req.params.type,
	}).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});

router_API.get('/db/findbrandsbytype/:type', function(req,res){
	database.distinct('brand',{
		type: req.params.type,
	}).then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});

var test = require('./API/Services/Lookups/interval.js');

router_API.get('/test', function(req,res){
	test.test().then(function(result){
		res.send(result);
	}).catch(function(err){
		res.send(err);
	});
});

module.exports = router_API;







