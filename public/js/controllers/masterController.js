/**
 * Created by karina on 28/03/17.
 */
"use strict";
app.controller('masterController', ['$scope','authFactory', function($scope, authFactory) {
    $scope.currentUser = authFactory.currentUser;
        authFactory.getCurrentUser();
    $scope.logout = authFactory.logout;

 }]);
