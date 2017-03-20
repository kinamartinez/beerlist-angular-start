app.controller("mainCtrl", ["$scope", "beersService", function ($scope, beersService) {
    "use strict";

    var beerCopy;
    $scope.editBeer = function (beer) {
        this.enabled = true;
        beerCopy = angular.copy(beer);
    };

    var restore = function (beerCopy) {
        console.log(beerCopy);
        var currentBeerId;

        for (var i = 0; i < $scope.beers.length; i++) {
            currentBeerId = $scope.beers[i]._id;

            if (beerCopy._id == currentBeerId) {
                break;
            }
        }


        $scope.beers[i] = beerCopy;
    };

    $scope.cancel = function () {
        this.enabled = false;
       // restore(beerCopy)
    };


    $scope.updateBeer = function (beer) {

        beersService.updateBeer(beer).catch(function () {
            restore(beerCopy);
            console.log(beerCopy)

        })
    };

    beersService.getBeers().then(function (beers) {
        //beers como parametro es el array que creamos en el server, y la respuesta que se da
        //luego en el service, ademas con la siguiente expression, creamos un mirror que nos va a cambiar tambien el view
        $scope.beers = beers;
    });

    $scope.edit = function (beer) {
        console.log("beer is: " + beer);
        beersService.edit(beer).then(function (beer) {
            console.log("Your beer is updated")

        })
    };


    $scope.beers = beersService.beers;

    $scope.rate = beersService.rate;

    $scope.removeBeer = function (index) {
        var beer = $scope.beers[index];
        beersService.removeBeer(beer._id).then(function (beer) {
            $scope.beers.splice(index, 1);

        });
    };


    $scope.addBeer = function () {
        var newBeer = {
            name: $scope.name,
            style: $scope.style,
            abv: $scope.abv,
            image: $scope.image,
            ratings: [],
            avRate: 0
        };
        beersService.addBeer(newBeer).then(function (beer) {
            $scope.beers.push(beer);
        });
    }
}])
;
