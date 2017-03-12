app.controller("mainCtrl", ["$scope", "beersService", function ($scope, beersService) {
    "use strict";
    $scope.addBeer = beersService.addBeer;

    beersService.getBeers();

    $scope.edit = beersService.edit;

    $scope.beers = beersService.beers;

    $scope.removeBeer = beersService.removeBeer;

    $scope.rate = beersService.rate;

    $scope.addBeer = function() {
        var newBeer = {
            name: $scope.name,
            style: $scope.style,
            abv: $scope.abv,
            image: $scope.image,
            ratings: [],
            avRate: 0
        };
        beersService.addBeer(newBeer);
    }
}]);
