var API_URL = "http://localhost:3000";


var app = angular.module('app', ['ngCookies']);

app.controller("collectionsController", function collectionsController($scope, $http, $window, $cookieStore) {

    $scope.collectionActive = {};
    $http.get(API_URL+"/app/collections",{
        headers: {'Authorization': $cookieStore.get('token')}
    })
    .success(function(response) {
    	$scope.collections = response;
    })
    .error(function(error) {
        console.log(error);
          $window.location.href = 'login.html';
    });
    $scope.onCollectionClick = function(item){
        $scope.collectionActive = {};
        $("a").blur();
        $scope.colloectionName = item;  
        $http.get(API_URL+"/app/"+item.replace("nodegrid.",""),{
            headers: {'Authorization': $cookieStore.get('token')}
        })
        .success(function(response) {

            var tempAry = [];
            response.data.forEach(function(i){
                console.log(i);
                if(typeof i.data.name == 'undefined'){
                    i.data['name'] = "anonymous";
                }

                tempAry.push(i);
            });
            $scope.objects = tempAry;
            $scope.collectionActive[item] = "active";
        })
        .error(function(error) {
          $window.location.href = 'login.html';
        });
    };

    $scope.onRowClick = function(row){
        $scope.itemActive = {};
        $("a").blur();
        $scope.item = row;
        $scope.keyList = Object.keys(row.data);
        $scope.itemActive[row._id] = "active";
    };

});
