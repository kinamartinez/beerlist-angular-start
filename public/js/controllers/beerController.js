/**
 * Created by karina on 21/03/17.
 */
"use strict";
app.controller("beerController", ["$scope", "$stateParams", "beersService", function ($scope, $stateParams, beersService) {
    $scope.beer = $stateParams.beerParam;
    console.log($stateParams.beerParam);

    if (!$stateParams.beerParam) {
        beersService.getBeer($stateParams.id)
            .then(function (beer) {
                $scope.beer = beer;
            })
    } else {
        $scope.beer = $stateParams.beerParam;
    }

    $scope.addReview = function (beer) {
        var newReview = {
            name: $scope.name,
            text: $scope.text
        };

        beersService.addReview(newReview, beer).then(function (review) {
            $scope.beer.reviews.push(review);
        }, function (err) {
            console.error(err);

        });
    }

}]);