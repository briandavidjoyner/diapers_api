var Promise = require('promise');

//////////////////////////////////////////
//Main Processing/////////////////////////
//////////////////////////////////////////

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
						input[i].ItemAttributes.Brand == 'Huggies' ||
						input[i].ItemAttributes.Brand == 'huggies' ||
						input[i].ItemAttributes.Brand == 'Pampers' ||
						input[i].ItemAttributes.Brand == 'pampers' ||
						input[i].ItemAttributes.Brand == 'Luvs' ||
						input[i].ItemAttributes.Brand == 'luvs' &&
						input[i].ItemAttributes.Title.indexOf('wipe') < -1 &&
						input[i].ItemAttributes.Title.indexOf('Wipe') < -1 &&
						input[i].ItemAttributes.Title.indexOf('wipes') < -1 &&
						input[i].ItemAttributes.Title.indexOf('Wipes') < -1 &&
					 	input[i].DetailPageURL != undefined &&
					 	input[i].LargeImage != undefined &&
					 	input[i].OfferSummary.LowestNewPrice.Amount != undefined &&
					 	input[i].ItemAttributes.Title.match(/count/gi) != null &&
					 	input[i].ItemAttributes.Size != undefined &&
					 	input[i].ItemAttributes.Size.indexOf('count') < 0 &&
					 	input[i].ItemAttributes.Size.indexOf('Count') < 0 &&
					 	input[i].ItemAttributes.Size.indexOf('pack') < 0 &&
					 	input[i].ItemAttributes.Size.indexOf('Pack') < 0 &&
					 	input[i].ItemAttributes.Size.indexOf('lbs') < 0 &&
					 	input[i].ItemAttributes.Size.indexOf('Lbs') < 0 &&
					 	input[i].ItemAttributes.Size == 1 ||
					 	input[i].ItemAttributes.Size == 2 ||
					 	input[i].ItemAttributes.Size == 3 ||
					 	input[i].ItemAttributes.Size == 4 ||
					 	input[i].ItemAttributes.Size == 5 ||
					 	input[i].ItemAttributes.Size == 6 ||
					 	input[i].ItemAttributes.Size == 7 ||
					 	input[i].ItemAttributes.Size == 8 ||
					 	input[i].ItemAttributes.Size == 'Newborn' ||
					 	input[i].ItemAttributes.Size == 'newborn' ||
					 	input[i].ItemAttributes.Size == 'premmie' ||
					 	input[i].ItemAttributes.Size == 'Premmie' ||
					 	Number.isInteger(parseInt(input[i].ItemAttributes.Title.match(/\d+(?=\s\wount)/))) == true &&
					 	input[i].ItemAttributes.Size.length < 10
						) { 
							output.push({
								type: 'diapers',
								title: input[i].ItemAttributes.Title,
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

//////////////////////////////////////////
//Post Processing/////////////////////////
//////////////////////////////////////////

exports.postProcess = function(type, data){

	var end = data.length;
	var processed = 0;

	return new Promise(function(resolve,reject){

		try { 
			for (var i in data){

					if (type == 'diapers'){
						data[i].size = data[i].size.replace((/\wize\s/), '');
						// regualar express match for 1  number || newborn || toddler || etc. (count this out via a new database and history counter)
						data[i].brand = data[i].brand.toLowerCase();
						data[i].brand = data[i].brand.trim();
					} else { reject ('Type is not defined'); } //Is this the way to handle this?

					//if (typeof data[i].units != 'number'){ //Find something better - this sucks
					//	console.log(data[i].units);
					//	data.splice(i,1);
					//}

			processed ++;

			if (processed == end){ resolve (data); }

			}

		} catch (err) {
			reject (err);
		}
	});
}

