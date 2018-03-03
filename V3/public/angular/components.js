//var base = '/';
var base = 'https://diapers-diapers.193b.starter-ca-central-1.openshiftapps.com/';
var url = {
			top : base + 'v3/public/angular/components/top.html',
			item : base + 'v3/public/angular/components/item.html',
			topcontent : base + 'v3/public/angular/components/top-content.html',
			items : base + 'v3/public/angular/components/items.html',
			footer : base + 'v3/public/angular/components/footer.html',
			filters : base + 'v3/public/angular/components/filters.html',
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

diaperApp.directive('items', function () {
    return {
        restrict: 'E',
        replace: true,
        //scope: {items: '=items'},
        templateUrl: url.items,
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

