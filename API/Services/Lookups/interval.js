var Promise = require('promise');
var database = require('../Database/database.js');
var standardize = require('./Lookup.js').standardize;
var interval = 5; //In Minutes
var toExport = {};

var toDB = function(vendor,type,brand,page){
	return new Promise(function(resolve,reject){
		standardize(vendor,type,brand,page).then(function(result){
			database.addItems(result);
		}).then(function(result){
			resolve ();
		}).catch(function(err){
			reject (err);
		});
	});
}

var addDiapers = function(){
	return new Promise(function(resolve,reject){
		database.removeItems({type:'diapers'}).then(function(){
			toDB('amazon','diapers','huggies',1);
		}).then(function(){
			toDB('amazon','diapers','huggies',2);
		}).then(function(){
			toDB('amazon','diapers','huggies',3);
		}).then(function(){
			toDB('amazon','diapers','huggies',4);
		}).then(function(){
			toDB('amazon','diapers','huggies',5);
		}).then(function(){
			toDB('amazon','diapers','huggies',6);
		}).then(function(){
			toDB('amazon','diapers','huggies',7);
		}).then(function(){
			toDB('amazon','diapers','huggies',8);
		}).then(function(){
			toDB('amazon','diapers','huggies',9);
		}).then(function(){
			toDB('amazon','diapers','huggies',10);
		}).then(function(){
			toDB('amazon','diapers','pampers',1);
		}).then(function(){
			toDB('amazon','diapers','pampers',2);
		}).then(function(){
			toDB('amazon','diapers','pampers',3);
		}).then(function(){
			toDB('amazon','diapers','pampers',4);
		}).then(function(){
			toDB('amazon','diapers','pampers',5);
		}).then(function(){
			toDB('amazon','diapers','pampers',6);
		}).then(function(){
			toDB('amazon','diapers','pampers',7);
		}).then(function(){
			toDB('amazon','diapers','pampers',8);
		}).then(function(){
			toDB('amazon','diapers','pampers',9);
		}).then(function(){
			toDB('amazon','diapers','pampers',10);
		}).then(function(){
			toDB('amazon','diapers','luvs',1);
		}).then(function(){
			toDB('amazon','diapers','luvs',2);
		}).then(function(){
			toDB('amazon','diapers','luvs',3);
		}).then(function(){
			toDB('amazon','diapers','luvs',4);
		}).then(function(){
			toDB('amazon','diapers','luvs',5);
		}).then(function(){
			toDB('amazon','diapers','luvs',6);
		}).then(function(){
			toDB('amazon','diapers','luvs',7);
		}).then(function(){
			toDB('amazon','diapers','luvs',8);
		}).then(function(){
			toDB('amazon','diapers','luvs',9);
		}).then(function(){
			toDB('amazon','diapers','luvs',10);
		}).then(function(){
			resolve ();
		}).catch(function(err){
			reject ();
		}); 
	});
}

exports.test = function(){
	return new Promise(function(resolve,reject){
		toDB('amazon','diapers','huggies',1).then(function(result){
			resolve (result);
		}).catch(function(err){
			reject (err);
		});
	});
}

//////////////////////////////////////////
//Automated Lookup////////////////////////
//////////////////////////////////////////

//This can be commented out to disable lookup.
addDiapers().then(function(){console.log('Items Populating @ ' + new Date());});
setInterval(function(){
		addDiapers();
}, (interval*60*1000));
