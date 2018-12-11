//Base URL Set
var baseURL = window.location.origin;

if (baseURL.indexOf('diapersdiapers') > -1){
    baseURL = 'https://nodejs-mongo-persistent-diapers.193b.starter-ca-central-1.openshiftapps.com';
}

var url = {
			top : baseURL + '/v3/public/angular/components/top.html',
			item : baseURL + '/v3/public/angular/components/items3.html',
			topcontent : baseURL + '/v3/public/angular/components/top-content.html',
            middlecontent : baseURL + '/v3/public/angular/components/middle-content.html',
			items : baseURL + '/v3/public/angular/components/items.html',
            bottom : baseURL + '/v3/public/angular/components/bottom.html',
			footer : baseURL + '/v3/public/angular/components/footer.html',
			filters : baseURL + '/v3/public/angular/components/filters.html'
}

diaperApp.directive('top', function () {
    return {
        restrict: 'E',
        replace: true,
        //scope: {user: '='},
        templateUrl: url.top,
        //controller: 'diapers'
    }
});

diaperApp.directive('item', function () {
    return {
        restrict: 'E',
        replace: true,
        //scope: {items: '=item'},
        templateUrl: url.item,
        //controller: 'diapers'
    }
});

diaperApp.directive('topcontent', function () {
    return {
        restrict: 'E',
        replace: true,
        //scope: {user: '='},
        templateUrl: url.topcontent,
        //controller: 'diapers'
    }
});

diaperApp.directive('middlecontent', function () {
    return {
        restrict: 'E',
        replace: true,
        //scope: {user: '='},
        templateUrl: url.middlecontent,
        //controller: 'diapers'
    }
});

diaperApp.directive('items', function () {
    return {
        restrict: 'E',
        replace: true,
        //scope: {items: '=items'},
        templateUrl: url.items,
        //controller: 'diapers'
    }
});

diaperApp.directive('bottom', function () {
    return {
        restrict: 'E',
        replace: true,
        //scope: {items: '=items'},
        templateUrl: url.bottom,
        //controller: 'diapers'
    }
});

diaperApp.directive('footer', function () {
    return {
        restrict: 'E',
        replace: true,
        //scope: {items: '=items'},
        templateUrl: url.footer,
        //controller: 'diapers'
    }
});

diaperApp.directive('filters', function () {
    return {
        restrict: 'E',
        replace: true,
        //scope: {items: '=items'},
        templateUrl: url.filters,
        //controller: 'diapers'
    }
});