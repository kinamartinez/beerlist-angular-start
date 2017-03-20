var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/beers");

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


var Beer = require("./models/BeerModel");

app.get('/beers', function (req, res, next) {
    Beer.find(function (error, beers) {
        if (error) {
            console.error(error);
            return next(error);
        }
        else {
            console.log(typeof beers);
            console.log(beers);
            res.send(beers);
        }

    });

});
app.post('/beers/:id/reviews', function (req, res, next) {
    Beer.findById(req.params.id, function (err, foundBeer) {
        if (err) {
            console.error(err);
            return next(err);
        } else if (!foundBeer) {
            return res.send("Error! No beer found with that ID");
        } else {
            foundBeer.reviews.push(req.body);
            foundBeer.save(function (err, updatedBeer) {
                if (err) {
                    return next(err);
                } else {
                    res.send(updatedBeer);
                }
            });
        }
    });
});

app.post('/beers', function (req, res, next) {
    Beer.create(req.body, function (err, beer) {
        if (err) {
            console.error(err);
            return next(err);
        } else {
            res.send(beer);
        }
    });
});

app.delete('/beers/:beerid/reviews/:reviewid', function(req, res, next) {
    Beer.findById(req.params.beerid, function(err, foundBeer) {
        if (err) {
            return next(err);
        } else if (!foundBeer) {
            return res.send("Error! No beer found with that ID");
        } else {
            var reviewToDelete = foundBeer.reviews.id(req.params.reviewid);
            if (reviewToDelete) {
                reviewToDelete.remove();
                foundBeer.save(function(err, updatedBeer) {
                    if (err) {
                        return next(err);
                    } else {
                        res.send(updatedBeer);
                    }
                });
            } else {
                return res.send("Error! No review found with that ID");
            }
        }
    });
});

app.delete('/beers/:id', function (req, res, next) {
    Beer.remove({_id: req.params.id}, function (err) {
        if (err) {
            console.error(err);
            return next(err);
        } else {
            res.send("Beer Deleted");
        }
    });
});


var getRate = function (rating) {
    var total = 0;
    var average;
    for (var i = 0; i < rating.length; i++) {

        total += rating[i];
    }
    if (rating.length > 0) {
        average = (total / rating.length);
        return average
    }
    else {
        return 0
    }
};


app.put('/beers/:id', function (req, res, next) {
    var beer = req.body;
    beer.avRate = getRate(beer.rating);
    Beer.findByIdAndUpdate({_id: req.params.id}, beer, {new: true}, function (err, beer) {
        if (err) {
            console.error(err);
            return next(err);
        } else {

            res.send(beer);
        }
    });


});

app.use(express.static('public'));
app.use(express.static('node_modules'));

// error handler to catch 404 and forward to main error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// main error handler
// warning - not for use in production code!
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});


app.listen(8000, function () {
    console.log("Fullstack project. Listening on 8000.")

});





