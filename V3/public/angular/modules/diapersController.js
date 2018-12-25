function getJsonFromUrl() {
  var urlP = window.location.href;
  var query = urlP.substr(1);
  var question = location.href.indexOf("?");
  var query = location.href.substr(question+1);
  var hash = query.indexOf("#");
  if(hash>-1) query = query.substr(0,hash);
  var result = {};
  query.split("&").forEach(function(part) {
    if(!part) return;
    part = part.split("+").join(" "); // replace every + with space, regexp-free version
    var eq = part.indexOf("=");
    var key = eq>-1 ? part.substr(0,eq) : part;
    var val = eq>-1 ? decodeURIComponent(part.substr(eq+1)) : "";
    var from = key.indexOf("[");
    if(from==-1) result[decodeURIComponent(key)] = val;
    else {
      var to = key.indexOf("]",from);
      var index = decodeURIComponent(key.substring(from+1,to));
      key = decodeURIComponent(key.substring(0,from));
      if(!result[key]) result[key] = [];
      if(!index) result[key].push(val);
      else result[key][index] = val;
    }
  });
  return result;
}


//Base URL Set
var baseURL = window.location.origin;
var basePath = window.location.pathname; 

if (baseURL.indexOf('diapersdiapers') > -1){
    baseURL = 'https://nodejs-mongo-persistent-diapers.193b.starter-ca-central-1.openshiftapps.com';
}

diaperApp.controller("diapers", ['$scope', '$http', function ($scope, $http) {

    //Set Initial Brand & Size
    $scope.Init = function(basePath,brand,size){ return new Promise(function(resolve,reject){ 
        $scope.selectedSize = 'any sized';
        $scope.selectedBrand = 'any brand';
        $scope.clean_items = [];
        $scope.params = getJsonFromUrl();

        if ($scope.params.brand =='pampers'){
            $scope.selectedBrand = 'pampers';
        } else if ($scope.params.brand == 'huggies'){
            $scope.selectedBrand = 'huggies';
        } else if ($scope.params.brand == 'luvs'){
            $scope.selectedBrand = 'luvs';
        } else {
            $scope.selectedBrand = 'any brand';
        }

        if ($scope.params.size =='1'){
            $scope.selectedSize = '1';
        } else if ($scope.params.size =='2'){
            $scope.selectedSize = '2';
        } else if ($scope.params.size =='3'){
            $scope.selectedSize = '3';
        } else if ($scope.params.size =='4'){
            $scope.selectedSize = '4';
        } else if ($scope.params.size =='5'){
            $scope.selectedSize = '5';
        } else if ($scope.params.size =='6'){
            $scope.selectedSize = '6';
        } else if ($scope.params.size =='7'){
            $scope.selectedSize = '7';
        } else {
            $scope.selectedSize = 'any sized';
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

    //Alert If Error
/*    $scope.alertCheck = function(){
        return new Promise(function(resolve,reject){
            if ($scope.clean_items.length > 0){
                console.log('1');
                resolve ();
            } else {
                $http.get('/api/alertmessage').then(function(){
                    console.log('alert!');
                    resolve ();
                });
            }
        });
    }
*/

    //GA Event
    $scope.analytics = function(category,action,label){
        window.gtag('event', action, {
            'event_category': category,
            'event_label': label
            //'value': <value>
        });
    };

    $scope.update = function(){
        window.myLazyLoad = new LazyLoad();
        window.prerenderReady = true; 
    };
    
    //Initialize
    
    $scope.Init(basePath).then(function(){$scope.update_items().then(function(){
            window.scope = $scope; }).then(function(){
                //$scope.alertCheck();
            }).then(function(){
                //console.log('2');
                return;
            });
    });
}]);