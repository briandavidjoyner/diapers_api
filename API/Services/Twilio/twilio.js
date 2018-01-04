var Promise = require('promise');
var Twilio = require('../../../node_modules/twilio/lib');
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var token = process.env.TWILIO_AUTH_TOKEN;

// Establish connection
var twilio = new Twilio(accountSid, token);

// Send message using promise
var send = function(phone,message){
	return new Promise(function(resolve,reject){
		twilio.messages.create({
  			from: '+12075604170',
  			to: '+1' + phone,
  			body: 'Hello!  Tyler isn\'t going to know what hit him.  Muhahahahah!  http://diapers-diapers.193b.starter-ca-central-1.openshiftapps.com/api/sms/message/9196360365'
		}).then(function(result){
			resolve(result);
		}).catch(function(err){
			reject(err);
		});
	});
}

exports.twilio = function(phone,message){
	return new Promise(function(resolve,reject){
		send(phone,message).then(function(result) {
  			resolve('message sent')
		}).catch(function(err){
			reject(err);
		});
	});
}