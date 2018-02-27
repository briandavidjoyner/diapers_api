//URLS
var base_url = 'https://diapers-diapers.193b.starter-ca-central-1.openshiftapps.com';
var url ={
	top_item : base_url + '/v3/public/angular/components/top_item.html'
}

diaperApp.directive('topItem', function () {
    return {
        restrict: 'E',
        replace: true,
        //scope: {user: '='},
        templateUrl: url.top_item,
        //controller: 'diapers'
    }
});