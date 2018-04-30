//Base URL Set
var baseURL = window.location.origin;

if (baseURL.indexOf('diapersdiapers') > -1){
    baseURL = 'https://diapers-diapers.193b.starter-ca-central-1.openshiftapps.com';
}

diaperApp.controller("diapers", ['$scope', '$http' ,function ($scope, $http) {
    
    //Get Items
   	$http.get(baseURL + '/api/db/finditemsbytype/diapers').then(function(result){
        $scope.items = result.data;
    });

    //Get Brands & Sizes
    $http.get(baseURL + '/api/db/findbrandsbytype/diapers').then(function(result){
            $scope.brands = result.data;
            $scope.brands.push('any brand');
    }).then(function(){ $http.get(baseURL + '/api/db/findsizesbytype/diapers').then(function(result){
            $scope.sizes = result.data;
            $scope.sizes.push('any sized');
    });
    });

   	//Scope
    $scope.update_items_api = function(brand,size){ 
        
        $http.get(baseURL + '/api/db/finditemsbytypebrandsize/diapers/' + brand + '/' + size).then(function(result){
            $scope.items = result.data;
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
            console.log('brand and size');
            $scope.update_items_api($scope.selectedBrand,$scope.selectedSize);
        } else if ($scope.selectedBrand !== 'any brand' && $scope.selectedSize === 'any sized'){
            console.log(baseURL + '/api/db/finditemsbytypeandbrand/diapers/' + brand);
            $http.get(baseURL + '/api/db/finditemsbytypeandbrand/diapers/' + brand).then(function(result){
                $scope.items = result.data;
            });
        } else if ($scope.selectedSize !== 'any sized' && $scope.selectedBrand === 'any brand'){
            console.log(baseURL + '/api/db/finditemsbytypeandsize/diapers/' + size);
            $http.get(baseURL + '/api/db/finditemsbytypeandsize/diapers/' + size).then(function(result){
                $scope.items = result.data;
            });
        } else {
            $http.get(baseURL + '/api/db/finditemsbytype/diapers').then(function(result){
                    console.log('reset');
                    $scope.items = result.data;
            });
        }
    }

    $scope.selectedSize = 'any sized';
    $scope.selectedBrand = 'any brand';

    //Make scope global
    window.scope = $scope;

}]);