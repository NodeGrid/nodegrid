var API_URL = "http://localhost:3000";


var app = angular.module('app', ['ngCookies','ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: '/portal/web/login.html',
        controller: 'loginController'
    }).
        when('/login/:status', {
        templateUrl: '/portal/web/login.html',
        controller: 'loginController'
        }).
      when('/app', {
        templateUrl: '/portal/web/app.html',
        controller: 'collectionsController'
      }).
        when('/register', {
        templateUrl: '/portal/web/register.html',
        controller: 'registerController'
      }).
        when('/shell', {
        templateUrl: '/portal/web/shell.html',
        controller: 'shellController'
      }).
        when('/push', {
        templateUrl: '/portal/web/push.html',
        controller: 'pushController'
      }).
      otherwise({
        redirectTo: '/app'
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
                    i.data['name'] = i._id;
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

            $scope.loginLoading = true;
            $http({
                url: API_URL+"/system/security/generateToken",
                method: "POST",
                data: { 'username' : username, "password":password}
                }).success(function(responce){
                    $cookieStore.put('token',responce.data[0].data.accessToken);
                    $window.location.href ='#app';
                }).error(function(err, status){
                    console.log(err);
                    console.log(status);
                    if (status == 409) {
                        $cookieStore.put('token', err.data[0].data.accessToken);
                        $window.location.href ='#app';
                    } else {
                        $scope.loginErr = err.msg + " ...!!";
                        $scope.loginLoading = false;
                    }
                });
    };
});

app.controller("registerController", function($scope, $http, $window, $cookieStore){

    $scope.register = function(username,name, password){

            $scope.registerLoading = true;
        
            $http({
                url: API_URL+"/system/user",
                method: "POST",
                data: { 'username' : username, "name":name, "password":password}
                }).success(function(responce){
                    $window.location.href ='#login/success';
                }).error(function(err){
                    console.log(err);
                    $scope.loginErr = "Error While Registering the User";
                    $scope.registerLoading = false;
                });
    };
});

app.controller("shellController", function($scope, $http, $cookieStore){

    var history = [];
    var count = 1;

    $scope.submitCMD = function(cmd){

        history.push(cmd);
        count = 0;

        var cmds = cmd.split(" ");
        if(cmds.length < 2){
            $scope.systaxErr = true;
            return;
        }

        $http({
                url: API_URL+cmds[1],
                method: cmds[0],
                headers: {
                    'Authorization': $cookieStore.get('token')
                },
                data: cmds[2]
                }).success(function(data, status){
                    $scope.status = status;
                    $scope.data = JSON.stringify(data, undefined, 2);
                }).error(function(data, status){
                    $scope.status = status;
                    $scope.data = JSON.stringify(data, undefined, 2);
                });
        };

    $scope.showHistory = function(evt){

        

        if(evt.keyCode == 38){
            
            console.log(history + " "+ count);
            if(history.length-count > 0){
                count ++;
                $("#cmdTxt").val(history[history.length-count]);
                $scope.cmd = history[history.length-count];
            }
            
        }
        else if(evt.keyCode == 40){

console.log(history + " "+ count);

            if(count > 0 && history.length-count >= 0){
                count --;
                $("#cmdTxt").val(history[history.length-count]);
                $scope.cmd = history[history.length-count];
            }
        }
    };
});

app.controller("pushController", function($scope, $http, $window, $cookieStore){

    $http.get(API_URL+"/app/push/notifier/google",{
        headers: {'Authorization': $cookieStore.get('token')}
    })
    .success(function(response) {
        console.log(response);
        $scope.GoogleNotifier = response.data;
        $scope.gcmkeyList = Object.keys(response.data);
    })
    .error(function(error) {
          $window.location.href = '#login';
    });

    $http.get(API_URL+"/app/push/notifier/apple",{
        headers: {'Authorization': $cookieStore.get('token')}
    })
    .success(function(response) {
        console.log(response);
        $scope.AppleNotifier = response.data;
        $scope.apnskeyList = Object.keys(response.data);
    })
    .error(function(error) {
          $window.location.href = '#login';
    });

    $scope.sendPush = function(){

        $scope.pushLoading = true;

        var pushEndPoint = API_URL+"/app/push"+$scope.pushEntity;
        var dataArry = [];
        if($scope.isToAll){
            pushEndPoint = pushEndPoint+"/all";
        }
        else{
            var idArray = $scope.pushEntityIDS.split(",");
            idArray.forEach(function(e){
                dataArry.push(e);
            });
        }

        $http({
                url: pushEndPoint,
                method: "POST",
                data: {"ids":dataArry, "message":$scope.pushMsg},
                headers: {'Authorization': $cookieStore.get('token')}
                }).success(function(data, status){
                    console.log(status+data);
                    $scope.status = status;
                    $scope.data = JSON.stringify(data, undefined, 2);
                    $scope.pushLoading = false;
                }).error(function(data, status){
                    console.log(status+data);
                    $scope.status = status;
                    $scope.data = JSON.stringify(data, undefined, 2);
                    $scope.pushLoading = false;
                });

    }

});
