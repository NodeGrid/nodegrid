var API_URL = "http://localhost:3000";


var app = angular.module('app', ['ngCookies','ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'web/login.html',
        controller: 'loginController'
    }).
        when('/login/:status', {
        templateUrl: 'web/login.html',
        controller: 'loginController'
        }).
      when('/app', {
        templateUrl: 'web/app.html',
        controller: 'collectionsController'
      }).
        when('/register', {
        templateUrl: 'web/register.html',
        controller: 'registerController'
      }).
      otherwise({
        redirectTo: '/login'
      });
}]);

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
          $window.location.href = '#login';
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
          $window.location.href = '#login';
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

app.controller("loginController", function($scope, $http, $window, $cookieStore,$routeParams){

    
    if($routeParams.status){
       $scope.status = $routeParams.status    
    }
    
    $scope.login = function(username,password){

            $http({
                url: API_URL+"/system/security/generateToken",
                method: "POST",
                data: { 'username' : username, "password":password}
                }).success(function(responce){
                    $cookieStore.put('token',responce.data.data.accessToken);
                    $window.location.href ='#app';
                }).error(function(err){
                    console.log(err);
                    $scope.loginErr = "Invalid Username and Password .. !!";
                });
    };
});

app.controller("registerController", function($scope, $http, $window, $cookieStore){

    $scope.register = function(username,name, password){

            $http({
                url: API_URL+"/system/user",
                method: "POST",
                data: { 'username' : username, "name":name, "password":password}
                }).success(function(responce){
                    $window.location.href ='#login/success';
                }).error(function(err){
                    console.log(err);
                    $scope.loginErr = "Error While Registering the User";
                });
    };
});