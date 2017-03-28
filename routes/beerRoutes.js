/**
 * Created by karina on 27/03/17.
 */
"use strict";
var express = require('express');
var router = express.Router();
var Beer = require("../models/BeerModel");

//the beer routes go here


var ensureAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.send(401, { message: "Unauthorized" });
    }
};

router.get('/', function (req, res, next) {
    Beer.find(function (error, beers) {
        if (error) {
            console.error(error);
            return next(error);
        }
        else {
            res.send(beers);
        }

    });

});

router.get('/:id', function(req, res, next) {
    Beer.findById(req.params.id, function(error, beer) {
        if (error) {
            console.error(error);
            return next(error);
        } else {
            res.send(beer);

        }
    });
});

router.post('/:id/reviews', ensureAuthenticated, function (req, res, next) {
    Beer.findById(req.params.id, function (err, foundBeer) {
        console.log(foundBeer);
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

router.post('/', ensureAuthenticated ,function (req, res, next) {
    Beer.create(req.body, function (err, beer) {
        if (err) {
            console.error(err);
            return next(err);
        } else {
            res.send(beer);
        }
    });
});

router.delete('/:id',ensureAuthenticated, function (req, res, next) {
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

router.put('/:id', ensureAuthenticated,  function (req, res, next) {
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

router.delete('/:beerid/reviews/:reviewid', function(req, res, next) {
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


module.exports = router;