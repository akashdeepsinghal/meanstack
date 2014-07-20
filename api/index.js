'use strict';

var verify = require('./verify.js');
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
	verify.isReqAuthentic(req,function(response,session){
		if(response){
			res.send('You got yourself into the api');
		}
		else{
			res.send('Invalid Request');
		}
	});
}

/*
Middleware functions for api/blogs/*
*/
exports.addBlog = function(req,res){
	verify.isReqAuthentic(req,function(response,session){
		if(response){
			var blog = req.body;
			Blog.create(blog,function(str){
				res.send(str);
			});
		}
		else{
			var err_resp = genres.generateResponse(false,invalid_auth_error);
			res.send(err_resp);
		}
	});
}

exports.updateBlog = function(req,res){
	verify.isReqAuthentic(req,function(response,session){
		if(response){
			var params = JSON.parse(req.body.blog);
			console.log(params);
			var blog_id = params._id;
			var changes = {
				'title' : params.title,
				'author' : params.author,
				'content' : params.content
			};
			console.log(changes);
			Blog.update(blog_id,changes,function(str){
				res.send(str);
			});
		}
		else{
			var err_resp = genres.generateResponse(false,invalid_auth_error);
			res.send(err_resp);
		}
	});
}

exports.getAllBlogs = function(req,res){
	verify.isReqAuthentic(req,function(response,session){
		if(response){
			var query = '';
			Blog.get(query,function(msg,data){
				var obj = JSON.parse(msg);
				obj.data = data;
				console.log(obj);
				res.send(JSON.stringify(obj));
			});
		}
		else{
			var err_resp = genres.generateResponse(false,invalid_auth_error);
			res.send(err_resp);
		}
	});
}

exports.getBlogByid = function(req,res){
	verify.isReqAuthentic(req,function(response,session){
		if(response){
			console.log('Till Here');
			var blog_id = req.body.blog_id;
			console.log(blog_id);
			var query = {
				_id :  blog_id
			};
			Blog.get(query,function(msg,data){
				var obj = JSON.parse(msg);
				obj.data = data;
				// console.log(obj);
				res.send(JSON.stringify(obj));
			});
		}
		else{
			var err_resp = genres.generateResponse(false,invalid_auth_error);
			res.send(err_resp);
		}
	});
}

exports.displayBlog = function(req,res){
	verify.isReqAuthentic(req,function(response,session){
		if(response){
			var params = req.body;
			var y = params.year;
			var m = params.month;
			var d = params.date;
			var un = params.urlName;
			Blog.get( { $and:[ {'year':y}, {'month':m}, {'date':d}, {'urlName':un} ]},function(str,data){
				var response = JSON.parse(str);
				response.data = data;
				console.log(response);
				res.send(JSON.stringify(response));
			});
		}
		else{
			var err_resp = genres.generateResponse(false,invalid_auth_error);
			res.send(err_resp);
		}
	});
}

exports.removeBlog = function(req,res){
	verify.isReqAuthentic(req,function(response,session){
		if(response){
			var params = req.body;
			var blog_id = params.blog_id;
			// var blogs = [];
			// blogs.push({"_id" : blog_id});
			console.log(blog_id);
			Blog.remove(blog_id,function(msg){
				res.send(msg);
			});
		}
		else{
			var err_resp = genres.generateResponse(false,invalid_auth_error);
			res.send(err_resp);
		}
	});
}