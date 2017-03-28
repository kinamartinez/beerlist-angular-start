/**
 * Created by karina on 27/03/17.
 */
"use strict";

app.factory('authFactory', function($http) {
    var auth = {};

    auth.currentUser = {};

    auth.register = function(user) {
        return $http.post('/users/register', user)
            .then(function(response) {
                auth.currentUser.username = angular.copy(response.data)
            });
    };

    auth.login = function(user) {
        return $http.post('/users/login', user)
            .then(function(response) {
                auth.currentUser.username = angular.copy(response.data)
            });
    };

    auth.getCurrentUser = function() {
        return $http.get('/users/currentUser')
            .then(function(response) {
                auth.currentUser.username = angular.copy(response.data)
            });
    };

    auth.logout = function(user) {
        return $http.get('/users/logout')
            .then(function(response) {
                auth.currentUser.username = null;
            });
    };

    return auth;
});
