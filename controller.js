// (function(){
//     'use strict';
var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http, $window) {

    //define searchedUser
    $scope.searchedUser = {};

    //trigger getUserById function
    $scope.getUserById = function(id){
        // console.log(id);
        $scope.getUserFromStorage(id);

    };

    //get userinfo from Server
    $scope.getUserFromServer = function(id){
        //$http service to GET userinfo from API
        $http({
            method: 'GET',
            //utilise public url from https://reqres.in/api
            url: 'https://reqres.in/api/users/' +id
        }).then(function successCallback(response) {
            $scope.searchedUser = response.data.data;
            console.log($scope.searchedUser);
            //set localstorage item 'userById'
            $window.localStorage.setItem('userById', JSON.stringify($scope.searchedUser));
            //define current time
            var now = new Date().getTime();
            //set localstorage item 'setupTime'
            $window.localStorage.setItem('setupTime', now);

        }, function errorCallback(response) {
            //service call back error
            console.log(response);
        });
    };

    //get userinfo from storage
    $scope.getUserFromStorage = function(id){
        if(!$window.localStorage.getItem("userById")){
            $scope.getUserFromServer(id);
            console.log("no user found");
        }else{
            var now = new Date().getTime();
            var setTime = $window.localStorage.getItem('setupTime');
            if (now-setTime<1000*30){
                $scope.searchedUser = $window.localStorage.getItem("userById");
                console.log($scope.searchedUser);
            }else{
                $scope.getUserFromServer(id);
            }
        }
    };

    //clear local storage
    $scope.clearCache = function(){
        console.log("clear")
        $window.localStorage.clear();
    };

});

// })