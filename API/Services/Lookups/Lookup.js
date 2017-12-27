var	Promise = require('promise');
var amazon = require('./Amazon/amazon.js');
var standarize = require('./Amazon/amazon_standards.js');

exports.output = function(brand,page){
	return new Promise(function(resolve,reject){
		amazon.diaperlookup(brand,page).then(function(result){
			return standarize.output(result);
		}).then(function(output){
			resolve (output);
		}).catch(function(err){
			reject (err);
		});
	});
}