var _ = require('underscore');
var UserTerm = require('./controllers/user_term.js');

exports.isReqAuthentic = function(req,callback){
	//console.log(req.session);
	var session_id,csrf_token;
	if(req.method === "GET"){
		session_id = req.query.session_id;
		csrf_token = req.query.csrf_token;
	}
	else {
		session_id = req.body.session_id;
		csrf_token = req.body.csrf_token;
	}
	console.log('session',session_id,csrf_token);
	if( _.isUndefined(session_id) ){
		console.log(req.session);
		session_id = req.session.session_id;
		console.log('cookie',session_id, csrf_token);
		if( !_.isUndefined(session_id) && !_.isUndefined(csrf_token) ){
			var obj = {
				'_id' : session_id
			}
			UserTerm.get(obj,function(str,session){
				//console.log("auth",str,session);
				var response = JSON.parse(str);
				if(response.status && session.length > 0 && session[0].active && csrf_token === session[0].csrf ){
					console.log('session valid');
					callback(true,session);
				}
				else{
					callback(false,null);
				}
			});
		}
		else{
			console.log("failed",session_id);
			callback(false);
		}
	}
	else{
		var obj = {
			'_id' : session_id
		}
		UserTerm.get(obj,function(str,session){
			//console.log("auth",str,session);
			var response = JSON.parse(str);
			if(response.status && session.length > 0 && session[0].active && csrf_token === session[0].csrf){
				console.log('session valid');
				callback(true,session);
			}
			else{
				callback(false,null);
			}
		});
	}
}

exports.loginVerify = function(req,callback){
	var session_id,csrf_token;
	if(req.method === "GET"){
		session_id = req.query.session_id;
	}
	else {
		session_id = req.body.session_id;
	}
	if( _.isUndefined(session_id) ){
		var session_id = req.session.session_id;
		// console.log(req.session);
		// console.log('cookie',session_id);
		if( !_.isUndefined(session_id) ){
			var obj = {
				'_id' : session_id
			}
			UserTerm.get(obj,function(str,session){
				// console.log("verify",str,session);
				var response = JSON.parse(str);
				if(response.status && session.length > 0 && session[0].active ){
					console.log('session valid');
					callback(true,session);
				}
				else{
					callback(false,null);
				}
			});
		}
		else{
			// console.log("failed",session_id);
			callback(false);
		}
	}
	else{
		var obj = {
			'_id' : session_id
		}
		console.log('session_id' + session_id);
		UserTerm.get(obj,function(str,session){
			//console.log("auth",str,session);
			var response = JSON.parse(str);
			if(response.status && session.length > 0 && session[0].active){
				console.log('session valid');
				callback(true,session);
			}
			else{
				callback(false,null);
			}
		});
	}
}