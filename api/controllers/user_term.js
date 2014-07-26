'use strict';

var crypto = require('crypto');
var UserTerm = require('../models/user_term.js');
var genRes = require('./genres.js');
var _ = require('underscore');
var salt = "e7db7b5a995460e0870d9dd5a0fc1698";		//md5 of 'saltissalty';

exports.add = function(param,callback){
	var hash = param.user_id+param.start_time+salt;
	hash = crypto.createHash('sha1').update(hash).digest('hex');
	param.csrf = hash;
	var session = new UserTerm(param);
	session.save(function(err,session){
		//console.log(session);
		if(_.isNull(err)){
			var response = genRes.generateResponse(true,"session made successfully");
			callback(response,session);
		}
		else{
			var response = genRes.generateResponse(false,"There occured some error : "+err);
			callback(response,null);
		}
	});
}

exports.end = function(session_id,callback){
	var end_time = Date();
	UserTerm.findByIdAndUpdate(session_id,{ 'end_time' : end_time, 'active' : false },function(err,session){
		if( _.isNull(err) ){
			var response = genRes.generateResponse(true,"session ended successfully");
			callback(response);
		}
		else{
			var response = genRes.generateResponse(false,"There occured some error : "+err);
			callback(response);
		}
	});
}

exports.get = function(param,callback){
	UserTerm.find(param,function(err,session){
		if( _.isNull(err) ){
			console.log('Calling from User term controller, session found successfully', session);
			var response = genRes.generateResponse(true,"session found successfully");
			callback(response,session);
		}
		else{
			console.log('Calling from User term controller, session NOT found successfully');
			var response = genRes.generateResponse(false,"There occured some error : "+err);
			callback(response,null);
		}
	});
}

exports.showAll = function(callback){
	UserTerm.find(function(err,users){
		callback(users);
	});
}