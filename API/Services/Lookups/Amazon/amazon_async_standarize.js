var Promise = require('promise');
	
exports.standarize(type,data){
	try {
			if (type === 'diapers'){
				var data_length = data.length;
				
			} else throw new Error ('Undefined Type')
	} catch(e) {
		return;
}

var promisePush = function(data,array){
	return new Promise(function(resolve,reject){
		array.push(data);
		resolve (array);
	}).catch(function(error){
		reject (error);
	});
}



