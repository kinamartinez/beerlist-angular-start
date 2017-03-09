var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var request = require('request');
var mongoose = require('mongoose');
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/beerlist-angular-start");
app.listen(8000, function() {
  console.log("Fullstack project. Listening on 8000.")

});



var BeerCollection = require("./models/BeersModel");




