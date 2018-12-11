var diaperApp = angular.module('diaperApp', ['ngRoute']);

diaperApp.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    'https://nodejs-mongo-persistent-diapers.193b.starter-ca-central-1.openshiftapps.com/**',
    'https://diapersdiapers.com/**',
    'https://www.diapersdiapers.com/**',
    'http://diapersdiapers.com/**',
    'http://www.diapersdiapers.com/**'
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

diaperApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'index.html',
            controller: 'diapers'
        })
        .otherwise({
            redirectTo: '/'
        });
}])