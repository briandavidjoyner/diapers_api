diaperApp.controller("diapers", function ($scope) {
    console.log('controller loaded');
    $scope.message = "Hello Angular World!";
    $scope.items = ['item2', 'items3', 'item4', 'item5', 'item6', 'item7'];
    $scope.item = ['item1'];
    window.scope = $scope;
});
	