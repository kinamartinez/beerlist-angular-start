/**
 * Created by karina on 09/03/17.
 */
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var beersCollectionSchema = new Schema({
    name:String ,
    style: String,
    abv: Number,
    image: String,
    rating: [String],
    avRate: Number,
});

var BeerCollection = mongoose.model('BeersModel', beersCollectionSchema);
module.exports = BeerCollection;

