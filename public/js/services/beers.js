app.service('beersService', function ($http) {
        var beers = [];

        var getBeers = function () {
            return $http.get('/beers')
                .then(function (response) {
                    angular.copy(response.data, beers);
                    console.log(beers)
                }, function (err) {
                    console.error(err)
                });
        };


        var addBeer = function (newBeer) {
            $http.post('/beers', newBeer)
                .then(function (response) {
                    console.log(response);
                    getBeers()
                }, function (err) {
                    console.error(err)
                })
        };


        var removeBeer = function (id) {
            $http.delete('/beers/' + id)
                .then(function () {
                    getBeers()
                })
        };


        var rate = function (beer, value) {
            beer = angular.copy(beer);
            beer.rating.push(value);
            $http.put('/beers/' + beer._id, beer)
                .then(function () {
                        getBeers()

                    },
                    function (err) {
                        console.error(err)
                    });


        };

        var edit = function (beer) {
            $http.put('/beers/' + beer._id, beer)
                .then(function () {
                    getBeers()
                }, function (err) {
                    console.error(err)
                })
        };

        var tempObj = {
            addBeer: addBeer,
            beers: beers,
            removeBeer: removeBeer,
            rate: rate,
            getBeers: getBeers,
            edit: edit
        };

        return tempObj;

    }
)
;


// {
//     name: "Guinness",
//     style: "Stout",
//     abv: "4.2%",
//     image: "https://cdn.beeradvocate.com/im/beers/754.jpg",
//     rating: [],
//     avRate: 0
//
// },
// {
//     name: "Club Colombia",
//     style: "Pale Lager",
//     abv: "4.7%",
//     image: "http://cervezafresca.com/wp-content/uploads/2010/05/cerveza-club-colombia.jpg",
//     rating: [],
//     avRate: 0
// },
//
// {
//     name: "Corona",
//     style: "Pale Lager",
//     abv: "4.5%",
//     image: "http://www.lcbo.com/content/dam/lcbo/products/186510.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg",
//     rating: [],
//     avRate: 0
// },
//
//
// {
//     name: "Leffe",
//     style: "Pale Ale",
//     abv: "6,6%",
//     image: "http://www.beerbible.net/beerpics/cpmxber2.jpg",
//     rating: [],
//     avRate: 0
// }
