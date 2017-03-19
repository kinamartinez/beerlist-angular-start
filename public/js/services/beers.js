app.service('beersService', function ($http) {
  var beersService ={};

        beersService.getBeers = function () {
            return $http.get('/beers')
                .then(function (response) {
                    return response.data
                }, function (err) {
                    console.error(err)
                });
        };


        beersService.addBeer = function (newBeer) {
            $http.post('/beers', newBeer)
                .then(function (response) {
                    return response.data
                }, function (err) {
                    console.error(err)
                })
        };


       beersService.removeBeer = function (id) {
            $http.delete('/beers/' + id)
                .then(function (response) {
                    return response.data
                })
        };


        var rate = function (beer, value) {
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
                .then(function (response) {
                    return response.data
                }, function (err) {
                    console.error(err)
                })
        };


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
