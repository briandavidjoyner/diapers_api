//API Docs https://developer.walmartlabs.com/docs
//API On NPM https://www.npmjs.com/package/walmart
var walmartAPIKey = process.env.walmartAPIKey;
var walmart = require('walmart')(walmartAPIKey);
var affiliateID = 'pmU8BlTkv30'
var Promise = require('promise');

exports.diaperlookup = function(brand){
	var query = brand + ' Diapers';
	var extras = {
		lsPublisherId : affiliateID,
		format : 'json',
		categoryId : '5427_486190_1101406',
		numItems : '25',
		responseGroup : 'full'
	};

	return new Promise(function(resolve,reject){
		walmart.search(query,extras).then(function(data){
			resolve (data.items);
		}).catch(function(err){
			reject (err);
		});
	});
}