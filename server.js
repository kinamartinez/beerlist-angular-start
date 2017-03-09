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


app.post('/beers', function(req, res, next) {
    Beer.create(req.body, function(err, beer) {
        if (err) {
            console.error(err);
            return next(err);
        } else {
            res.json(beer);
        }
    });
});

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

app.delete('/beers/:id', function(req, res, next) {
    Beer.remove({ _id: req.params.id }, function(err) {
        if (err) {
            console.error(err);
            return next(err);
        } else {
            res.send("Beer Deleted");
        }
    });
});

app.put('/beers/:id', function(req, res, next) {
    Beer.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, beer) {
        if (err) {
            console.error(err);
            return next(err);
        } else {
            console.log(req.body);

            console.log(beer);
            res.send(beer);
        }
    });
});
// app.get('/beers', function (req, res) {
//  res.json({
//      beers: [{
//          name: '512 IPA',
//          style: 'IPA',
//          image_url: 'http://bit.ly/1XtmB4d',
//          abv: 5
//      }, {
//          name: '512 Pecan Porter',
//          style: 'Porter',
//          image_url: 'http://bit.ly/1Vk5xj4',
//          abv: 4
//      }]
//  });
//
//    res.send("im working")
// });

app.listen(8000, function () {
    console.log("Fullstack project. Listening on 8000.")

});


//var request = require('request');

// app.post('/beers', function (req, res, next) {
//     console.log(req.body); //the data on a new book
//     res.send("From server route");
// });
//
// app.post('/beers', function(req, res, next) {
//     var beer = new Beer(req.body);
//
//     beer.save(function(err, beer) {
//         if (err) {
//             console.error(err);
//             return next(err);
//         } else {
//             res.json(beer);
//         }
//     });
// });



