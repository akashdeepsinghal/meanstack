// BASE SETUP
// ==============================================

var express = require('express');
var app 	= express();
var router	= express.Router();
var port    = process.env.PORT || 8080;

// Middlewares
var morgan 			= require('morgan');
var bodyParser 		= require('body-parser');
var methodOverride 	= require('method-override');
var cookieParser 	= require('cookie-parser');
var session 		= require('express-session');
var favicon			= require('serve-favicon');
var errorhandler	= require('errorhandler');
var mongoose		= require('mongoose');


// ROUTES
// ==============================================

app.use(express.static(__dirname + '/app'));		// set the static files location /public/img will be /img for users
app.use(morgan('dev'));								// log every request to the console
app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());							// parse application/json
app.use(methodOverride());							// simulate DELETE and PUT

if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler());
}

router.get('/', function(req, res) {
    res.send('home');  
});

mongoose.connect('mongodb://localhost/health');
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));

// START THE SERVER
// ==============================================
app.use('/',router);
app.listen(port);
console.log('Magic happens on port ' + port);