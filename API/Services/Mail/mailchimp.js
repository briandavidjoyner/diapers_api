var Mailchimp = require('mailchimp-api-v3')
var apiKey = process.env.mailchimpAPIKey || 'default';
var list_id = process.env.mailchimpListID || 'default';
var mailchimp = new Mailchimp(apiKey);
var Promise = require('promise');
var md5 = require('md5');

exports.subscribe = function(email,size,brand){
  return new Promise(function(resolve,reject){
    mailchimp.put('/lists/' + list_id + '/members/' + md5(email),
    {
      email_address: email,
      double_optin: false,
      status: 'subscribed',
      merge_fields:{
        SIZE:size, 
        BRAND:brand
      }
    }).then(function(results){
      resolve({status:'success',inputs:{email:email,size:size,brand:brand},results:results});
    }).catch(function(error){
      if (error.error) {
          resolve (error);
        } else {
          resolve(error);
        }
    });
  });
};