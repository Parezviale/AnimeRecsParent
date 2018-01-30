// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
 
// Configuration
mongoose.connect('mongodb://localhost/anime');
 
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());
 
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
 
// Models
var Show = mongoose.model('Show', {
    anime_id: Number,
    name: String,
    genre: String,
    type: String,
    rating: Number,
    members: Number
}, 'shows');

var User = mongoose.model('User', {
    name: String,
    age: String,
    bio: String,
    genres: String,
    username: String,
    email: String
}, 'user');

var Summary = mongoose.model('Summary', {
    id: Number,
    description: String
}, 'summary');

var Img = mongoose.model('Img', {
    id: Number,
    url: String,
}, 'img');

// Routes
 
    // Get reviews
    app.get('/api/shows', function(req, res) {
        console.log("fetching shows");
        Show.find(function(err, shows) {
            if (err)
                res.send(err);
            res.json(shows); // return all reviews in JSON format
        });
    });

    app.get('/api/initReccomendation', function(req, res) {
        console.log("fetching shows");
        Show.find().limit(50).sort({rating:1}).exec(function(err, shows) {
            if (err)
                res.send(err);
            console.log(shows);
            res.json(shows);
        });
    });

    app.get('/api/getUser/:username', function(req, res) {
       
        console.log("fetching user");
        var val = req.params.username;
        console.log(val);
        var query = {};
        query['username'] = val;
        console.log(query);
        User.find(function(err, user) {
            console.log(user);
            if (err)
                res.send(err);
            res.json(user); // return all reviews in JSON format
        });
    });

    app.get('/api/getShow/:id', function(req, res) {
        console.log("fetching show");
        var val = req.params.id;
        console.log(val);
        var query = {};
        query['anime_id'] = val;
        console.log(query);
        Show.find(query, function(err, shows) {
            if (err)
                res.send(err);
            res.json(shows); // return all reviews in JSON format
        });
    });

    app.get('/api/getSummary/:id', function(req, res) {
        console.log("fetching show");
        var val = req.params.id;
        console.log(val);
        var query = {};
        query['id'] = val;
        console.log(query);
        Summary.find(query, function(err, shows) {
            if (err)
                res.send(err);
            res.json(shows); // return all reviews in JSON format
        });
    });

    app.get('/api/getImg/:id', function(req, res) {
        console.log("fetching show");
        var val = req.params.id;
        console.log(val);
        var query = {};
        query['id'] = val;
        console.log(query);
        Img.find(query, function(err, shows) {
            if (err)
                res.send(err);
            res.json(shows); // return all reviews in JSON format
        });
    });


 
 
// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
