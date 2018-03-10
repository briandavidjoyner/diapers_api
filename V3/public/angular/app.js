var diaperApp = angular.module('diaperApp', []);

diaperApp.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://diapers-diapers.193b.starter-ca-central-1.openshiftapps.com/**',
    'https://diapersdiapers.com/**',
    'https://www.diapersdiapers.com/**'
  ]);
 });

diaperApp.filter('capitalize', function() {
        return function(input, scope) {
            if (input!=null)
            input = input.toLowerCase();
            return input.substring(0,1).toUpperCase()+input.substring(1);
        }
    });