var app = angular.module('beerList', ['ui.router']);


app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $stateProvider
        .state('home', {
            url: '/home',
            controller: 'mainCtrl',
            templateUrl: '/templates/home.html'

        })
        .state('beer', {
            url: '/beers/:id',
            controller: 'beerController',
            templateUrl: '/templates/beer.html',
            params: {
                beerParam: null
            }
        })

        .state('register', {
            url: '/register',
            templateUrl: '/templates/register.html',
            controller: 'authCtrl'
        })

        .state('login', {
            url: '/login',
            templateUrl: '/templates/login.html',
            controller: 'authCtrl'
        });

    $urlRouterProvider.otherwise('/home');
}]);

