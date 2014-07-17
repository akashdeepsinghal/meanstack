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
		if( _.isNull(err) && blogs.length > 0 ){
			var response = genRes.generateResponse(true,"found successfully");
			callback(response,blogs);
		}
		else if( blogs.length == 0 ){
			var response = genRes.generateResponse(true,"No user found");
			callback(response,null);
		}
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response,null);
		}
	});
}

exports.find = function(params,callback){
	Blog
	.find(params)
	.exec(function(err,blogs){
		//console.log(params);
		if( _.isNull(err) && blogs.length > 0 ){
			var response = genRes.generateResponse(true,"found successfully");
			callback(response,blogs);
		}
		else if( blogs.length == 0 ){
			var response = genRes.generateResponse(true,"No user found");
			callback(response,null);
		}
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response,null);
		}
	})
}

exports.remove = function(id,callback){
	console.log('id');
	console.log(id);
	Blog.findByIdAndRemove(id, function (err,blogs) {
		if( _.isNull(err) ){
			var response = genRes.generateResponse(true,"removed successfully");
			callback(response);
		}
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response);
		}
	})
};