var Promise = require('promise');

exports.Standardize = function(type,input){
	
	var input = input.Item;
	var end = input.length;
	var output = [];
	var processed = 0;

	return new Promise(function(resolve,reject){
		try {
			for (var i in input){
				
				if (type == 'diapers'){
					if (input[i].ItemAttributes.Brand != undefined &&
					 	input[i].DetailPageURL != undefined &&
					 	input[i].LargeImage != undefined &&
					 	input[i].OfferSummary.LowestNewPrice.Amount != undefined &&
					 	input[i].ItemAttributes.Title.match(/count/gi) != null &&
					 	input[i].ItemAttributes.Size != undefined
						) { 
							output.push({
								type: 'diapers',
								vendor: 'amazon',
								title: input[i].ItemAttributes.Title,
								brand: input[i].ItemAttributes.Brand,
								url: input[i].DetailPageURL,
								image: input[i].LargeImage.URL,
								price: input[i].OfferSummary.LowestNewPrice.Amount / 100,
								units: parseInt(input[i].ItemAttributes.Title.match(/\d+(?=\s\wount)/)),
								pricePerUnit: ((input[i].OfferSummary.LowestNewPrice.Amount / 100)/(input[i].ItemAttributes.Title.match(/\d+(?=\s\wount)/))).toFixed(2),
								size: input[i].ItemAttributes.Size
								}); 
							}
				} else { reject ('Type is not defined'); } //Is this the way to handle this?

			processed ++;

			if (processed == end){ resolve (output); }

			}

		} catch (err) {
			reject (err);
		}
	});
}