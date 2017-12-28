var database = require('../Database/database.js');
var interval = 5; //In Minutes

//function toDB (vendor,type,brand,page){
//	return new Promise(function(resolve,reject){
//		_this.standarize(vendor,type,brand,page).then(function(result){
//			console.log(result);
//			database.addItems(result);
//		}).catch(function(err){
//			reject(err);
//		});
//	});
//}

//function toExecute(){
//	database.removeItems({type:'diapers'}).then(function(){
//		toDB('amazon','diapers','huggies',1);
//	}).catch(function(err){
//			reject();
//	});
//}

//////////////////////////////////////////
//Automated Lookup////////////////////////
//////////////////////////////////////////

//toExecute();
//setInterval(function(){
//		toExecute();
//}, (interval*60*1000));