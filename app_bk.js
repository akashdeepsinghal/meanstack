// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

var routes = require('./routes');
var http = require('http');
var path = require('path');
var api = require('./api');

// configuration ===========================================
app.set('port', process.env.PORT || 8080);
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser({
keepExtensions: true,
uploadDir: '../upload/temp' }));

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
app.post('/api/blogs/getbyid',api.getBlogByid);
app.post('/api/blogs/remove',api.removeBlog);
app.post('/api/blogs/update',api.updateBlog);
app.post('/api/blogs/getall',api.getAllBlogs);
app.post('/api/blogs/display',api.displayBlog);

//routes for users
app.post('/api/users/add',api.addUser);
app.post("/api/users/getbyid",api.getUserById);
app.post('/api/users/login',api.loginUser);
app.post('/api/users/logout',api.logoutUser);
app.post('/api/users/remove',api.removeUser);
app.post("/api/users/updatename",api.updateUserName);
app.post("/api/users/updatepassword",api.updateUserPassword);

// app.get('/api/users/details',api.getUsers);		//test route


// app.get("/api/users/search",api.findUsers);

// app.post('/api/users/reset',api.resetPassword);
// app.post("/api/users/uploadpicture",api.updatePicture);

// start app ===============================================
http.createServer(app).listen(app.get('port'), function(){
	console.log('Revolving in the orbit on port ' + app.get('port'));
});

exports = module.exports = app; 						// expose app