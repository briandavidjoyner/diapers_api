var express = require('express');
var router = express.Router([options]);
var options;
var	Promise = require('promise');

router.use('/public', express.static(__dirname + '/public'));
console.log('1');
router.get('*',function(req,res){
	res.sendFile(__dirname + '/public/views/pages/angular/main.html');
});

module.exports = router;