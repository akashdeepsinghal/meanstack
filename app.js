// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var passport 	   = require('passport');
var LocalStrategy  = require('passport-local').Strategy;

var routes = require('./routes');
var http = require('http');
var path = require('path');
var api = require('./api');

// configuration ===========================================
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.bodyParser({keepExtensions: true}));
app.use(express.session({secret: 'trips'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(app.router);
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'app')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.set('views', __dirname + '/app');
  app.use(express.static(path.join(__dirname,'app')));
}
else{
  app.set('views',__dirname + '/app');
  app.use(express.static(path.join(__dirname,'app')));
}


// routes ==================================================
// require('./routes/index')(app); // pass our application into our routes

//routes for api
app.get('/api', api.index);

//routes for blog
app.post('/api/blogs/create',api.addBlog);
app.post('/api/blogs/getbyid',api.getBlogByid);
app.post('/api/blogs/remove',api.removeBlog);
app.post('/api/blogs/update',api.updateBlog);
app.post('/api/blogs/getall',api.getAllBlogs);
app.post('/api/blogs/display',api.displayBlog);

//routes for plan
app.post('/api/plans/create',api.addPlan);
app.post('/api/plans/getbyid',api.getPlanByid);
app.post('/api/plans/remove',api.removePlan);
app.post('/api/plans/update',api.updatePlan);
app.post('/api/plans/getall',api.getAllPlans);
app.post('/api/plans/display',api.displayPlan);

//routes for users
app.post('/api/users/add',api.addUser);
app.post("/api/users/getbyid",api.getUserById);
app.post('/api/users/login',api.loginUser);
app.post('/api/users/logout',api.logoutUser);
app.post('/api/users/remove',api.removeUser);
app.post("/api/users/updatename",api.updateUserName);
app.post("/api/users/updatepassword",api.updateUserPassword);

//ui route transferring control to Angular router
app.get('/', function(req,res){
	res.redirect('/login');
});
app.get('/login',routes.show);
app.get('/signup',routes.show);
// app.get('/forgot',routes.show);

app.get('*', routes.index);

// start app ===============================================
http.createServer(app).listen(app.get('port'), function(){
	console.log('Revolving in the orbit on port ' + app.get('port'));
});

exports = module.exports = app; 						// expose app