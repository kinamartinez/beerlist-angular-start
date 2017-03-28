var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var beerRoutes = require('./routes/beerRoutes');
var userRoutes = require('./routes/userRoutes');
var User = require("./models/UserModel");

mongoose.connect("mongodb://localhost/beers");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure passport and session middleware
app.use(session({ secret: 'thisIsASecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// Configure passport-local to use user model for authentication
passport.use(User.createStrategy()); //Thanks to m-l-p there is no need to create a local strategy
passport.serializeUser(User.serializeUser()); //also it helps here
passport.deserializeUser(User.deserializeUser()); //and here


//This tells the server that when a request comes into '/beers'
//that it should use the routes in 'beerRoutes'
//and those are in our new beerRoutes.js file
app.use('/beers', beerRoutes);
app.use('/users', userRoutes);

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.all('*', function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
});

// error handler to catch 404 and forward to main error handler
// not needed as we have the above route
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


// main error handler
// warning - not for use in production code!
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: err
    });
});

//start the server
app.listen(8000, function () {
    console.log("Fullstack project. Listening on 8000.")
});





