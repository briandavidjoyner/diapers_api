var express = require('express');
var router_demo = express.Router([options]);
var options;
var	Promise = require('promise');

router_demo.get('*',function(req,res){
	res.sendFile(__dirname + ('/public/views/pages/angular/main.html'));
});

module.exports = router_demo;