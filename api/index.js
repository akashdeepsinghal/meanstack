'use strict';

// var auth = require('./auth.js');
// var helper = require('./controllers/helper.js');
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var User = require('./controllers/users.js');
var Blog = require('./controllers/blogs.js');

var invalid_auth_error = "Invalid session : auth failed";

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

exports.index = function (req, res) {
	res.send('Invalid Request');
}

/*
Middleware functions for api/blogs/*
*/
exports.addBlog = function(req,res){
	var blog = req.body;
	console.log(blog);
	Blog.create(blog,function(str){
		res.send(str);
	});
}