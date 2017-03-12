/**
 * Created by karina on 09/03/17.
 */
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var beersCollectionSchema = new Schema({
    name:{type: String},
    style:{type: String},
    abv: {type: Number},
    image: {type: String},
    rating: [{type: Number}],
    avRate: {type: Number},
});

var Beer = mongoose.model('BeerModel', beersCollectionSchema);
module.exports = Beer;

