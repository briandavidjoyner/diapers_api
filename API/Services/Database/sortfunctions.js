exports.sort = function (dataIn){
	return new Promise(function(resolve,reject){
		var toReturn = dataIn.sort(function(a,b){
			return a.pricePerUnit - b.pricePerUnit;
		});
		resolve (toReturn);
	});	
}