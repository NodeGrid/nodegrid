/**
 * Created by Pahan on 11/15/2014.
 */

var API_URL = "http://localhost:3000";
var app = angular.module('login', ['ngCookies']);

app.controller("loginController", function($scope, $http, $window, $cookieStore){

    $scope.login = function(username,name,password,evt){

        var type = evt.currentTarget.innerHTML;
        console.log(type);
        if(type == "Login"){
            $http({
                url: API_URL+"/system/security/generateToken",
                method: "POST",
                data: { 'username' : username, "password":password}
                }).success(function(responce){
                    $cookieStore.put('token',responce.data.data.accessToken);
                    $window.location.href ='index.html';
                }).error(function(err){
                    console.log(err);
                    $scope.loginErr = "Invalid Username and Password .. !!";
                });
        }
        else if(type == "Register"){
            $http({
                url: API_URL+"/system/user",
                method: "POST",
                data: { 'username' : username, "name":name, "password":password}
                }).success(function(responce){
                    loginView();
                    $scope.loginSuccess = "Successfully Registered.. Please Login"
                }).error(function(err){
                    console.log(err);
                    $scope.loginErr = "Error While Registering the User";
                });
        }
    };
});

$(document).ready(function () {
    loginView();
});

$('#two-btn').click(function (evt) {

    var text = $(this).html();
    if (text === "Login") {
        loginView();
    }
    else if (text === "Register") {
        registerView();
    }
    else {
        console.log("Not Defined");
    }

});

$('#one-btn').click(function (evt) {
    console.log("One Click");
});

function loginView() {
    $('#form-header').html("Login");
    $('#one-btn').html("Login");
    $('#two-btn').html("Register").blur();
    $('#nameTxt').hide();
    $('#nameTxt').val("");
    $('#usernameTxt').val("");
    $('#passwordTxt').val("");
}

function registerView() {
    $('#form-header').html("Register");
    $('#one-btn').html("Register");
    $('#two-btn').html("Login").blur();
    $('#nameTxt').show();
    $('#nameTxt').val("");
    $('#usernameTxt').val("");
    $('#passwordTxt').val("");
}