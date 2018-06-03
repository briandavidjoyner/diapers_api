//Base URL Set
var baseURL = window.location.origin;
var basePath = window.location.pathname;

if (baseURL.indexOf('diapersdiapers') > -1){
    baseURL = 'https://diapers-diapers.193b.starter-ca-central-1.openshiftapps.com';
}

diaperApp.controller("diapers", ['$scope', '$http' ,function ($scope, $http) {
    
    //Set Initial Brand & Size
    $scope.Init = function(basePath){ return new Promise(function(resolve,reject){ 
        
        $scope.selectedSize = 'any sized';
        $scope.selectedBrand = 'any brand'; 
        
        if (basePath == '/pampers-coupons'){
            $scope.selectedBrand = 'pampers';
        } else if (basePath == '/huggies-coupons'){
            $scope.selectedBrand = 'huggies';
        }
        
        resolve();
    });
    }

    //Get Items
    $scope.getItems = function(){ return new Promise(function(resolve,reject){
        $http.get(baseURL + '/api/db/finditemsbytype/diapers').then(function(result){
            $scope.clean_items = result.data;
            resolve();
        }).catch(function(err){
            reject(err);
        });
    });
    }


    //Get Brands & Sizes
    $http.get(baseURL + '/api/db/findbrandsbytype/diapers').then(function(result){
            $scope.brands = result.data;
            $scope.brands.push('any brand');
    }).then(function(){ 
        $http.get(baseURL + '/api/db/findsizesbytype/diapers').then(function(result){
        $scope.sizes = result.data;
        $scope.sizes.push('any sized');
    });
    });

   	//Update Items By Brand And Size
    $scope.update_items_api = function(brand,size){  
        $http.get(baseURL + '/api/db/finditemsbytypebrandsize/diapers/' + brand + '/' + size).then(function(result){
            $scope.clean_items = result.data;
        }).catch(function(error){
            console.log('error');
            return;
        });
    };

    //Get Price Averages
    $http.get(baseURL + '/api/db/averageprice/diapers').then(function(result){
        $scope.priceaverage = result.data;
    }).catch(function(err){
        return err;
    });

    //Update Items Routing
    $scope.update_items = function(){ return new Promise(function(resolve,reject){
        
        //standardize inputs
        var brand = encodeURIComponent($scope.selectedBrand);
        var size = encodeURIComponent($scope.selectedSize);
        //console.log($scope.selectedBrand);
        //Select lookup
        if ($scope.selectedBrand !== 'any brand' && $scope.selectedSize !== 'any sized') {
            $scope.update_items_api($scope.selectedBrand,$scope.selectedSize);
        } else if ($scope.selectedBrand !== 'any brand' && $scope.selectedSize === 'any sized'){
            $http.get(baseURL + '/api/db/finditemsbytypeandbrand/diapers/' + brand).then(function(result){
                $scope.clean_items = result.data;
            });
            jQuery('#top_header').css('display','none');
            jQuery('#header_content').css('display','none');
        } else if ($scope.selectedSize !== 'any sized' && $scope.selectedBrand === 'any brand'){
            $http.get(baseURL + '/api/db/finditemsbytypeandsize/diapers/' + size).then(function(result){
                $scope.clean_items = result.data;
            });
            jQuery('#top_header').css('display','none');
            jQuery('#header_content').css('display','none');
        } else {
            $http.get(baseURL + '/api/db/finditemsbytype/diapers').then(function(result){
                    $scope.getItems();
            });
            jQuery('#top_header').css('display','initial');
            jQuery('#header_content').css('display','initial');
        }
        resolve();
    })};

    //GA Event
    $scope.analytics = function(category,action,label){
        window.gtag('event', action, {
            'event_category': category,
            'event_label': label
            //'value': <value>
        });
    };
    
    //Initialize
    
    $scope.Init(basePath).then(function(){$scope.update_items().then(function(){
            window.scope = $scope;
            window.prerenderReady = true;  
        });
    });

}]);