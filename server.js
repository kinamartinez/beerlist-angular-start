var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/beers");

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));
app.use(express.static('node_modules'));

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


app.delete('/beers/:id', function (req, res, next) {

    console.log(req.params.id);
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
        console.log(total);
    }
    average = (total / rating.length);
    return average

};


app.put('/beers/:id', function (req, res, next) {
    var beer = req.body;
    beer.avRate = getRate(beer.rating);
    Beer.findOneAndUpdate({_id: req.params.id}, beer, {new: true}, function (err, beer) {
        if (err) {
            console.error(err);
            return next(err);
        } else {

            res.send(beer);
        }
    });


});


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
    res.render('error', {
        message: err.message,
        error: err
    });
});


app.listen(8000, function () {
    console.log("Fullstack project. Listening on 8000.")

});





