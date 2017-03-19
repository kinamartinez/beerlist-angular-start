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


        beersService.addBeer = function (newBeer) {
            return $http.post('/beers', newBeer)
                .then(function (response) {
                    return response.data
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
                    console.error(err)
                })
        };

        return beersService
    }
);