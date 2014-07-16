// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

var routes = require('./routes');
var api = require('./api');
var http = require('http');
var path = require('path');

// configuration ===========================================
	
// config files
var db = require('./api/db');

app.set('port', process.env.PORT || 8080);
// var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/app')); // set the static files location /public/img will be /img for users

// routes ==================================================
require('./routes/index')(app); // pass our application into our routes


//routes for api
app.get('/api', api.index);

//routes for blog
app.post('/api/blogs/create',api.addBlog);
app.post('/api/blogs/getall',api.getBlogs);
app.post('/api/blogs/display',api.displayBlog);
// app.get('/api/blogs/getbyYMDN',api.getBlogsByYMDN); //YearMonthDateName (YMDN)
// app.get('/api/blogs/getbyid',api.getBlogByid);
// app.post('/api/blogs/edit',api.editBlog);
// app.post('/api/blogs/updatevisibility',api.updatevisibility);
// app.post("/api/blogs/remove",api.removeBlog);






// start app ===============================================
// app.listen(port);	
// console.log('Revolving in the orbit on port ' + port); 			// shoutout to the user


http.createServer(app).listen(app.get('port'), function(){
	console.log('Revolving in the orbit on port ' + app.get('port'));
});

exports = module.exports = app; 						// expose app