/*
Removing For Second
*/

/*var Promise = require('promise');
var Twilio = require('../../../node_modules/twilio/lib');
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var token = process.env.TWILIO_AUTH_TOKEN;

// Establish connection
var twilio = new Twilio(accountSid, token);

// Send message using promise
//var send = function(phone,message){
var send = function(){
	return new Promise(function(resolve,reject){
		twilio.messages.create({
  			from: '+12075604170',
  			to: '+19196360365',
  			body: 'It looks like diapersdiapers.com is down.  You should go fix it.'
		}).then(function(result){
			resolve(result);
		}).catch(function(err){
			reject(err);
		});
	});
}

//exports.twilio = function(phone,message){
exports.twilio = function(){
	return new Promise(function(resolve,reject){
		//send(phone,message).then(function(result) {
		send().then(function(result) {
  			resolve('Alert sent')
		}).catch(function(err){
			reject(err);
		});
	});
}*/