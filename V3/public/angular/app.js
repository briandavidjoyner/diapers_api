var diaperApp = angular.module('diaperApp', []);

diaperApp.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://nodejs-mongo-persistent-diapers.193b.starter-ca-central-1.openshiftapps.com//**',
    'https://diapersdiapers.com/**',
    'https://www.diapersdiapers.com/**'
  ]);
 });

diaperApp.filter('capitalize', function() {
    return function(text) {
      return (!!text) ? text.charAt(0).toUpperCase() + text.substr(1).toLowerCase() : '';
    }
});

diaperApp.filter('deal', function() {
    return function(number) { 
      return (number > 0) ? (100*Math.abs(number)).toFixed(0) + '% ' + 'more expensive' : (100*Math.abs(number)).toFixed(0) + '% ' + 'less expensive';
    }
});