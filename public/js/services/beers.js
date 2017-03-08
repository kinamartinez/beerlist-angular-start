app.service('beersService', function () {
    var beers = [
        {
            name: "Guinness",
            style: "Stout",
            abv: "4.2%",
            image: "https://cdn.beeradvocate.com/im/beers/754.jpg",
            rating: [],
            avRate: 0

        },
        {
            name: "Club Colombia",
            style: "Pale Lager",
            abv: "4.7%",
            image: "http://cervezafresca.com/wp-content/uploads/2010/05/cerveza-club-colombia.jpg",
            rating: [],
            avRate: 0
        },

        {
            name: "Corona",
            style: "Pale Lager",
            abv: "4.5%",
            image: "http://www.lcbo.com/content/dam/lcbo/products/186510.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg",
            rating: [],
            avRate: 0
        },


        {
            name: "Leffe",
            style: "Pale Ale",
            abv: "6,6%",
            image: "http://www.beerbible.net/beerpics/cpmxber2.jpg",
            rating: [],
            avRate: 0
        }

    ];

    var addBeer = function (newBeer) {
        beers.push(newBeer);
        console.log(beers)
    };

    var removeBeer = function ($index) {
        beers.splice($index, 1);
    };

    var rating = function ($index, value) {
        console.log($index, value);
        beers[$index].rating.push(value);
        console.log(beers);
        getRate($index)
    };

    var getRate = function ($index) {
        var total = 0;
        console.log("hey");
        for (var i = 0; i < beers[$index].rating.length; i++) {

            total += beers[$index].rating[i];
            console.log(total);
        }
        beers[$index].avRate = (total / beers[$index].rating.length).toFixed(2);
        console.log(beers[$index].avRate);

    };

       return {
        addBeer: addBeer,
        beers: beers,
        removeBeer: removeBeer,
        rating: rating,
        getRate: getRate,
        }

});