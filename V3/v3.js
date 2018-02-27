var express = require('express');
var router = express.Router([options]);
var options;
var	Promise = require('promise');

router.use('/public', express.static(__dirname + '/public'));

router.get('*',function(req,res){
	res.sendFile(__dirname + '/public/index.html');
});

module.exports = router;