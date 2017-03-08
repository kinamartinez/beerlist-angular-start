app.controller("mainCtrl", ["$scope", "beersService", function ($scope, beersService) {
    "use strict";
    $scope.addBeer = beersService.addBeer;

    $scope.beers = beersService.beers;

    $scope.removeBeer = beersService.removeBeer;

    $scope.rating = beersService.rating;

    $scope.getRate = beersService.getRate;

    $scope.avg = beersService.avg;

    $scope.addAverRate = beersService.addAverRate;

    $scope.addBeer = function() {
        var newBeer = {
            name: $scope.name,
            style: $scope.style,
            abv: $scope.abv,
            image: $scope.image,
            ratings: [],
            averageRating: 0
        };
        beersService.addBeer(newBeer);
    }
}]);
