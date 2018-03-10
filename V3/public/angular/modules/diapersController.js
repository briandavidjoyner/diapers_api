diaperApp.controller("diapers", ['$scope', '$http' ,function ($scope, $http) {
    
    //Get Items
   	$http.get('https://diapers-diapers.193b.starter-ca-central-1.openshiftapps.com/api/db/finditemsbytype/diapers').then(function(result){
            $scope.items = result.data;
    });

   	//Scope
    $scope.brands = ['brand 1', 'brand 2', 'brand 3'];
    $scope.sizes = ['All Sizes', 'size 1', 'size 2', 'size 3'];
    $scope.selectedSize = 'All Sizes';
    $scope.selectedBrand = 'brand 1';
    window.scope = $scope;
}]);