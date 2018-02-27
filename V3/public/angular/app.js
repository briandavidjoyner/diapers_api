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

diaperApp.directive('top-item', function () {
    return {
        restrict: 'E',
        replace: true,
        //scope: {user: '='},
        templateUrl: 'https://diapers-diapers.193b.starter-ca-central-1.openshiftapps.com/v3/public/angular/components/top-item.html',
        //controller: 'diapers'
    }
});

console.log('components loaded');
	
console.log('module loaded');