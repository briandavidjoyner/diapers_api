diaperApp.directive('header', function () {
    console.log('header');
    return {
        restrict: 'E',
        replace: true,
        //scope: {user: '='},
        templateUrl: '/v3/public/angular/components/header.html',
        //controller: 'diapers'
    }
});