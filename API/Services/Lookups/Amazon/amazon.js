var amazon = require('apac').OperationHelper;
var aws = new amazon({
    awsId: process.env.amazonAccessKeyId,
    awsSecret: process.env.amazonSecretAccessKey,
    assocId:   'diapersforles-20',
    maxRequestsPerSecond: 1
});

exports.diaperlookup = function(brand,page){
	var page = page || 1;
	return new Promise(function(resolve,reject){
		aws.execute('ItemSearch', {
			SearchIndex: "Baby",
			Brand: brand,
			BrowseNode: '166772011',
			//Keywords: 'disposiable',
			Availability: "Available", 
			Sort: "psrank", 
			ResponseGroup:"Images,ItemAttributes,Offers,BrowseNodes",
			ItemPage : page
		}).then(function(result){
			resolve (result.result.ItemSearchResponse.Items);
		}).catch(function(err){
			reject (err);
		});
	});
}

exports.diaperwipeslookup = function(brand,page){
	var page = page || 1;
	return new Promise(function(resolve,reject){
		aws.execute('ItemSearch', {
			SearchIndex: "Baby",
			Brand: brand,
			BrowseNode: '677974011',
			//Keywords: 'wipes',
			Availability: "Available", 
			Sort: "psrank", 
			ResponseGroup:"Images,ItemAttributes,Offers,BrowseNodes",
			ItemPage : page
		}).then(function(result){
			resolve (result.result.ItemSearchResponse.Items);
		}).catch(function(err){
			reject (err);
		});
	});
}
