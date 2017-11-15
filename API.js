var express = require('express');
var router_API = express.Router([options]);
var options;
var mailchimp = require('./API/Services/Mail/mailchimp.js');

router_API.get('/route1', function(req, res) {
    res.send('OMG... Google Cloud Kinda Rules, But Openshift Isn\'t awful...'); 
});

router_API.get('/mail/subscribe/:email/:size/:brand', function(req, res){
	return new Promise(function(resolve,reject){
		mailchimp.subscribe(req.params.email,req.params.size,req.params.brand)
			.then(function(result){
		res.send(result);
			}).catch(function(err){
		res.send(err);
		});
	});
});

module.exports = router_API;