/**
 * Created by karina on 27/03/17.
 */
"use strict";
app.controller('authCtrl', ['$scope','authFactory','$state', function($scope, authFactory, $state) {
    $scope.register = function() {
        authFactory.register($scope.user)
            .then(function() {
                $state.go('home');
            }, function(err) {
                alert(err.data.message);
            });
    };
    $scope.login = function() {
        authFactory.login($scope.user)
            .then(function() {
                $state.go('home');
            }, function(err) {
                alert(err.data);
            });
    }
}]);
