app.service('beersService', function ($http) {
        var beersService = {};

        beersService.getBeers = function () {
            return $http.get('/beers')
                .then(function (response) {
                    return response.data
                }, function (err) {
                    console.error(err)
                });
        };

        beersService.getBeer = function (id) {
            return $http.get('/beers/' + id)
                .then(function (response) {
                    return response.data
                }, function (err) {
                    console.error(err)
                });
        };


        beersService.addBeer = function (newBeer) {
            return $http.post('/beers', newBeer)
                .then(function (response) {
                    return response.data
                }, function (err) {
                    console.error(err)
                })
        };

        beersService.addReview = function (newReview, beer) {
            console.log(newReview);
            console.log(beer);
            return $http.post('/beers/' + beer._id + '/reviews/', newReview)
                .then(function (updatedBeer) {
                    return updatedBeer.data.reviews[updatedBeer.data.reviews.length - 1];
                }, function (err) {
                    console.error(err)
                })
        };

        beersService.removeBeer = function (id) {
            return $http.delete('/beers/' + id)
                .then(function (response) {
                    return response.data
                })
        };

        beersService.removeReview = function (beer) {
            return $http.delete('/beers/' + beer._id + '/reviews/' + id)
                .then(function (response) {
                    return response.data;
                });
        };

        beersService.rate = function (beer, value) {
            beer.rating.push(value);
            return $http.put('/beers/' + beer._id, beer)
                .then(function () {

                    },
                    function (err) {
                        console.error(err)
                    });


        };

        beersService.edit = function (beer) {
            return $http.put('/beers/' + beer._id, beer)
                .then(function (response) {
                    return response.data
                }, function (err) {
                    alert(err.data.message)
                })
        };

        beersService.updateBeer = function (beer) {
            return $http.put('/beers/' + beer._id, beer)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;

                }, function (err) {
                    alert(err.data.message)
                });
        };

        return beersService
    }
);