'use strict';

var Plan = require('../models/plans.js');
var genRes = require('./genres.js');
var _ = require('underscore');

exports.create = function(params,callback){
	for (var i = 0; i < 30; i++) {
		console.log('params');
	};
	console.log(params);
	// var plan = new Plan(params);
	// plan.save(function(err,plan){
	// 	console.log(plan);
	// 	if( !(_.isNull(err)) ){
	// 		var response_string = genRes.generateResponse(false , "There occured some error : "+err.err);
	// 		callback(response_string);
	// 	}
	// 	else{
	// 		var response_string = genRes.generateResponse(true,"Plan created successfully");
	// 		callback(response_string);
	// 	}
	// })
}

exports.get = function(params,callback){
	console.log(params);
	Plan.find(params).exec(function (err,plans) {
		if( _.isNull(err) && plans.length > 0 ){
			var response = genRes.generateResponse(true,"found successfully");
			callback(response,plans);
		}
		else if( plans.length == 0 ){
			var response = genRes.generateResponse(true,"No plan found");
			callback(response,null);
		}
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response,null);
		}
	})
};

exports.remove = function(id,callback){
	console.log('id');
	console.log(id);
	Plan.findByIdAndRemove(id, function (err,plans) {
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

exports.update = function(id,params,callback){
	Plan.findByIdAndUpdate(id,params,function(err,user){
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