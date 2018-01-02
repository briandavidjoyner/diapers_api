var	Promise = require('promise');
var amazon = require('./Amazon/amazon.js');
var standarize = require('./Amazon/amazon_standards.js');
var _this = {};

_this.standardize = function(vendor,type,brand,page){
	if (vendor == 'amazon'){

		if (type == 'diapers'){

			//Amazon Diapers
			return new Promise(function(resolve,reject){
				amazon.diaperlookup(brand,page).then(function(result){
					return standarize.Standardize('diapers',result);
				}).then(function(output){
					resolve (output);
				}).catch(function(err){
					reject (err);
				});
			});

		} else { return new Promise(function(resolve,reject){ reject ('Item type is not defined') });}

	} else { return new Promise(function(resolve,reject){ reject ('Vendor is not defined') });}
}


//////////////////////////////////////////
//Export Methods//////////////////////////
//////////////////////////////////////////

module.exports = _this;