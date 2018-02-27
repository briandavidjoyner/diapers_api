diaperApp.directive('header', function () {
    console.log('header');
    return {
        restrict: 'E',
        replace: true,
        //scope: {user: '='},
        templateUrl: 'https://diapers-diapers.193b.starter-ca-central-1.openshiftapps.com/v3/public/angular/components/header.html',
        //controller: 'diapers'
    }
});