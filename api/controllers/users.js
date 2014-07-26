'use strict';

var User = require('../models/users.js');
var crypto = require('crypto');
var genRes = require('./genres.js');
var UserTerm = require('./user_term.js');
var _ = require('underscore');

exports.create = function(params,callback){
	params.password = crypto.createHash('sha1').update(params.password).digest('hex');
	params.picture = '/images/anonymous.png';
	var user = new User(params);
	user.save(function(err,user){
		console.log(user);
		if( !(_.isNull(err)) ){
			var response_string = genRes.generateResponse(false , "There occured some error : "+err.err);
			callback(response_string);
		}
		else{
			var response_string = genRes.generateResponse(true,"User created successfully");
			callback(response_string);
		}
	})
}

//the callback is returned with the response string and data
exports.login = function(params,callback){
	var email = params.email;
	var password = params.password;
	password = crypto.createHash('sha1').update(password).digest('hex');
	User.findOne({ 'email' : email, 'password' : password }, function(err,user){
		console.log(user);
		console.log(err);
		if( _.isNull(err) && !_.isNull(user) ){
			var session_obj = {
				'user_id' : user.id,
				'start_time' : Date()
			};
			UserTerm.add(session_obj,function(msg,session){
				var msg_obj = JSON.parse(msg);
				if( msg_obj.status ){
					var response_string = genRes.generateResponse(true,"user logged in successfully")
					callback(response_string,session);
				}
				else{
					var response = genRes.generateResponse(false,"There occured some error "+msg);
					callback(response,null);
				}
			});
				
		}
		else{
			var response_string = genRes.generateResponse(false,"no user found or there occured some error : "+err);
			callback(response_string,null);
		}
	})
};
// exports.login = function(email,password,callback){
// 	password = crypto.createHash('sha1').update(password).digest('hex');
// 	User.findOne({ 'email' : email, 'password' : password }, function(err,user){
// 		//console.log(user,err);
// 		if( _.isNull(err) && !_.isNull(user) ){
// 			var session_obj = {
// 				'user_id' : user.id,
// 				'start_time' : Date()
// 			};
// 			UserTerm.add(session_obj,function(msg,session){
// 				var msg_obj = JSON.parse(msg);
// 				if( msg_obj.status ){
// 					var response_string = genRes.generateResponse(true,"user logged in successfully")
// 					callback(response_string,session);
// 				}
// 				else{
// 					var response = genRes.generateResponse(false,"There occured some error "+msg);
// 					callback(response,null);
// 				}
// 			});
				
// 		}
// 		else{
// 			var response_string = genRes.generateResponse(false,"no user found or there occured some error : "+err);
// 			callback(response_string,null);
// 		}
// 	})
// };

exports.authenticateJabber = function(username,server,password,callback){
	password = crypto.createHash('sha1').update(password).digest('hex');
	var id = username;
	User.findOne({ '_id' : id, password : password },function(err,user){
		if( _.isNull(err) && !_.isNull(user) ){
			callback(true);
		}
		else{
			callback(false);
		}
	});
}

exports.showAll = function(callback){
	User.find(function(err,users){
		callback(users);
	});
}

//update password
exports.updatePassword = function(user_id,old_password,new_password,callback){
	var old_password = crypto.createHash('sha1').update(old_password).digest('hex');
	var new_password_hash = crypto.createHash('sha1').update(new_password).digest('hex');
	User.findById(user_id , function(err,user){
		if(err == null){
			var password = user.password;
			if( old_password === password ){
				User.update({ '_id' : user_id } ,{ 'password' : new_password_hash }, function(err,numberAffected, raw){
					if( err == null ){
						//console.log(numberAffected,raw);
						var response = genRes.generateResponse(true,"Updated password successfully");
						callback(response);
					}
					else{
						var response = genRes.generateResponse(false,"There occured some error "+err);
						callback(response);
					}
				});
			}
			else{
				var response = genRes.generateResponse(false,"Password provided do not match original password");
				callback(response);
			}
		}
		else{
			var response = genRes.generateResponse(false,"no user found");
			callback(response);
		}
	});
}


//reset password
exports.reset = function(email,callback){
	var new_password = 'zozo123';
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	var string_length = 8;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}

	var new_password = randomstring;
	var new_password_hash = crypto.createHash('sha1').update(new_password).digest('hex');
	
	User.update({ 'email' : email } ,{ 'password' : new_password_hash }, function(err,numberAffected, raw){
		if( err == null ){
		//console.log(numberAffected,raw);
		var response = genRes.generateResponse(true,"Password reset successfull "+randomstring);
		callback(response);
		}
		else{
			var response = genRes.generateResponse(false,"There occured some error "+err);
			callback(response);
		}
	});	
}

//update user details
exports.update = function(user_id,params,callback){
	User.findByIdAndUpdate(user_id,params,function(err,user){
		if( _.isNull(err) ){
			var response = genRes.generateResponse(true,"details updated successfully");
			callback(response);
		}
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response);
		}
	})
}

exports.find = function(params,callback){
	User
	.find(params)
	.limit(5)
	.exec(function(err,users){
		//console.log(params);
		if( _.isNull(err) && users.length > 0 ){
			var response = genRes.generateResponse(true,"found successfully");
			callback(response,users);
		}
		else if( users.length == 0 ){
			var response = genRes.generateResponse(true,"No user found");
			callback(response,null);
		}
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response,null);
		}
	})
}

exports.findbyid = function(user_id,callback){
	User.findById(user_id , function(err,user){				
		if( _.isNull(err) ){
			var response = genRes.generateResponse(true,"found successfully");
			callback(response,user);
		}		
		else{
			var response = genRes.generateResponse(false,"there occured some error : "+err);
			callback(response,null);
		}
	})
}