var Promise = require('promise');
var Twilio = require('../../../node_modules/twilio/lib');
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var token = process.env.TWILIO_AUTH_TOKEN;

var twilio = new Twilio(accountSid, token);

//
// Send message using promise
var promise = twilio.messages.create({
  from: '+12075604170',
  to: '+19196360365',
  body: 'Hello!  I got Twilio to work... kinda.'
});

exports.twilio = function(){
	return new Promise(function(resolve,reject){

		promise.then(function(message) {
  			resolve('message sent')
		}).catch(function(err){
			reject(err);
		});
	});
}
