app.controller("mainCtrl", ["$scope", "beersService", function ($scope, beersService) {
    "use strict";

    beersService.getBeers().then(function(beers) { //beers como parametro es el array que creamos en el server, y la respuesta que se da
        //luego en el service, ademas con la siguiente expression, creamos un mirror que nos va a cambiar tambien el view
        $scope.beers = beers;
    });

    $scope.edit = beersService.edit;

    $scope.beers = beersService.beers;

    $scope.rate = beersService.rate;

    $scope.removeBeer = function (beer) {
        beersService.removeBeer(beer).then(function (beer) {
            for (var i = 0; i < beers.length; i++) {
                if ($scope.beers[i]._id = beer._id) {
                    $scope.beers.splice(i, 1);
                    break;
                }
            }

        });
    };




    $scope.addBeer = function (newBeer) {
        beersService.addBeer(newBeer).then(function (beer) {
            $scope.beers.push(beer);
        });
    }

}]);
