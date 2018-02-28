diaperApp.directive('top', function () {
    return {
        restrict: 'E',
        replace: true,
        //scope: {user: '='},
        templateUrl: 'https://diapers-diapers.193b.starter-ca-central-1.openshiftapps.com/v3/public/angular/components/top-item.html',
        //controller: 'diapers'
    }
    console.log('components loaded');
});

