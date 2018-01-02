var Promise = require('promise');
var Twilio = require('../../../node_modules/twilio/lib');
var accountSid = process.env.TWILIO_ACCOUNT_SID || 'ACbbe1bfcac2adacfb7f50b330dded1d84';
var token = process.env.TWILIO_AUTH_TOKEN || 'dfb8a4c46cfb99e2e8c6e88085258485';

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
