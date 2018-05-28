//Base URL Set
var baseURL = window.location.origin;

if (baseURL.indexOf('diapersdiapers') > -1){
    baseURL = 'https://diapers-diapers.193b.starter-ca-central-1.openshiftapps.com';
}

diaperApp.controller("diapers", ['$scope', '$http' ,function ($scope, $http) {
    
    //Get Items
    $scope.getItems = function(){
        $http.get(baseURL + '/api/db/finditemsbytype/diapers').then(function(result){
            $scope.items = result.data;
            $scope.clean_items = $scope.clean(result.data);
        });
    }
    $scope.getItems();

    //Get Brands & Sizes
    $http.get(baseURL + '/api/db/findbrandsbytype/diapers').then(function(result){
            $scope.brands = result.data;
            $scope.brands.push('any brand');
    })
    .then(function(){ $http.get(baseURL + '/api/db/findsizesbytype/diapers').then(function(result){
            $scope.sizes = result.data;
            $scope.sizes.push('any sized');
    });
    });

    //Get Price Averages
        $http.get(baseURL + '/api/db/averageprice/diapers').then(function(result){
        $scope.priceaverage = result.data;
    });


   	//Scope
    $scope.update_items_api = function(brand,size){  
        $http.get(baseURL + '/api/db/finditemsbytypebrandsize/diapers/' + brand + '/' + size).then(function(result){
            $scope.clean_items = result.data;
        }).catch(function(error){
            console.log('error');
            return;
        });
    }

    $scope.update_items = function(){

        //standardize inputs
        var brand = encodeURIComponent($scope.selectedBrand);
        var size = encodeURIComponent($scope.selectedSize);

        //Select lookup
        if ($scope.selectedBrand !== 'any brand' && $scope.selectedSize !== 'any sized') {
            $scope.update_items_api($scope.selectedBrand,$scope.selectedSize);
        } else if ($scope.selectedBrand !== 'any brand' && $scope.selectedSize === 'any sized'){
            $http.get(baseURL + '/api/db/finditemsbytypeandbrand/diapers/' + brand).then(function(result){
                $scope.clean_items = $scope.clean(result.data);
            });
            jQuery('#top_header').css('display','none');
            jQuery('#header_content').css('display','none');
        } else if ($scope.selectedSize !== 'any sized' && $scope.selectedBrand === 'any brand'){
            $http.get(baseURL + '/api/db/finditemsbytypeandsize/diapers/' + size).then(function(result){
                $scope.clean_items = $scope.clean(result.data);
            });
            jQuery('#top_header').css('display','none');
            jQuery('#header_content').css('display','none');
        } else {
            $http.get(baseURL + '/api/db/finditemsbytype/diapers').then(function(result){
                    //$scope.clean_items = result.data;
                    $scope.getItems();
            });
            jQuery('#top_header').css('display','initial');
            jQuery('#header_content').css('display','initial');
        }
    }

    //GA Event
    $scope.analytics = function(category,action,label){
        //console.log(category);
        window.gtag('event', action, {
            'event_category': category,
            'event_label': label
            //'value': <value>
        });
    }

    //Top Item
    $scope.clean = function(items){
        var out = [];
        var length = items.length;
            for (i=0; i<length; i++){
                (items[i].size == 'Preemie'|| 
                    items[i].size == 'Newborn')||
                    items[i].size == 1||
                    items[i].size == 2||
                    items[i].size == 3||
                    items[i].size == 4||
                    items[i].size == 5||
                    items[i].size == 7||
                    items[i].size == 8 ? out.push(items[i]) : false;
            }
        window.prerenderReady = true;
        return out;
    }

    $scope.selectedSize = 'any sized';
    $scope.selectedBrand = 'any brand';

    //Make scope global
    window.scope = $scope;

}]);