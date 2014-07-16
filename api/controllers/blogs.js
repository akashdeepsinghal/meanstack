'use strict';

var Blog = require('../models/blogs.js');
var genRes = require('./genres.js');
var _ = require('underscore');

exports.create = function(params,callback){
	var blog = new Blog(params);
	blog.save(function(err,blog){
		console.log(blog);
		if( !(_.isNull(err)) ){
			var response_string = genRes.generateResponse(false , "There occured some error : "+err.err);
			callback(response_string);
		}
		else{
			var response_string = genRes.generateResponse(true,"Blog created successfully");
			callback(response_string);
		}
	})
}

exports.showAll = function(callback){
	Blog.find(function(err,blogs){
		callback(blogs);
	});
}