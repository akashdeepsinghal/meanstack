'use strict';

var verify = require('./verify.js');
var genres = require('./controllers/genres.js')
var _ = require('underscore');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var User = require('./controllers/users.js');
var Blog = require('./controllers/blogs.js');
var Plan = require('./controllers/plans.js');

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
	console.log("Calling from getAllBlogs");
	Blog.get('',function(msg,data){
		var obj = JSON.parse(msg);
		obj.data = data;
		res.send(JSON.stringify(obj));
	});
}

exports.getBlogByid = function(req,res){
	console.log('Till Here');
	var blog_id = req.body.blog_id;
	console.log(blog_id);
	var query = {
		_id :  blog_id
	};
	Blog.get(query,function(msg,data){
		var obj = JSON.parse(msg);
		obj.data = data;
		res.send(JSON.stringify(obj));
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


/*
Middleware functions for api/plans/*
*/

exports.addPlan = function(req,res){
			for (var i = 0; i < 30; i++) {
				console.log('plan');
			};
			var plan = req.body.plan;
			console.log(plan);
			// res.send(genres.generateResponse(true,"Plan created successfully"))
			Plan.create(plan,function(str){
				res.send(str);
			});
	// verify.isReqAuthentic(req,function(response,session){
	// 	if(response){

	// 	}
	// 	else{
	// 		var err_resp = genres.generateResponse(false,invalid_auth_error);
	// 		res.send(err_resp);
	// 	}
	// });
}


// exports.addPlan = function(req,res){
// 	verify.isReqAuthentic(req,function(response,session){
// 		if(response){
// 			for (var i = 0; i < 30; i++) {
// 				console.log('plan');
// 			};
// 			var plan = req.body.plan;
// 			console.log(plan);
// 			res.send(genres.generateResponse(true,"Plan created successfully"))
// 			// Plan.create(plan,function(str){
// 			// 	res.send(str);
// 			// });
// 		}
// 		else{
// 			var err_resp = genres.generateResponse(false,invalid_auth_error);
// 			res.send(err_resp);
// 		}
// 	});
// }

// exports.addPlan = function(req,res){
// 	verify.isReqAuthentic(req,function(response,session){
// 		if(response){
// 			var plan = req.body;
// 			Plan.create(plan,function(str){
// 				res.send(str);
// 			});
// 		}
// 		else{
// 			var err_resp = genres.generateResponse(false,invalid_auth_error);
// 			res.send(err_resp);
// 		}
// 	});
// }

exports.updatePlan = function(req,res){
	verify.isReqAuthentic(req,function(response,session){
		if(response){
			var params = JSON.parse(req.body.plan);
			console.log(params);
			var plan_id = params._id;
			var changes = {
				'title' : params.title,
				'author' : params.author,
				'content' : params.content
			};
			console.log(changes);
			Plan.update(plan_id,changes,function(str){
				res.send(str);
			});
		}
		else{
			var err_resp = genres.generateResponse(false,invalid_auth_error);
			res.send(err_resp);
		}
	});
}

exports.getAllPlans = function(req,res){
	console.log("Calling from getAllPlans");
	Plan.get('',function(msg,data){
		var obj = JSON.parse(msg);
		obj.data = data;
		res.send(JSON.stringify(obj));
	});
}

exports.getPlanByid = function(req,res){
	console.log('Till Here');
	var plan_id = req.body.plan_id;
	console.log(plan_id);
	var query = {
		_id :  plan_id
	};
	Plan.get(query,function(msg,data){
		var obj = JSON.parse(msg);
		obj.data = data;
		res.send(JSON.stringify(obj));
	});
}

exports.displayPlan = function(req,res){
	verify.isReqAuthentic(req,function(response,session){
		if(response){
			var params = req.body;
			var y = params.year;
			var m = params.month;
			var d = params.date;
			var un = params.urlName;
			Plan.get( { $and:[ {'year':y}, {'month':m}, {'date':d}, {'urlName':un} ]},function(str,data){
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

exports.removePlan = function(req,res){
	verify.isReqAuthentic(req,function(response,session){
		if(response){
			var params = req.body;
			var plan_id = params.plan_id;
			// var plans = [];
			// plans.push({"_id" : plan_id});
			console.log(plan_id);
			Plan.remove(plan_id,function(msg){
				res.send(msg);
			});
		}
		else{
			var err_resp = genres.generateResponse(false,invalid_auth_error);
			res.send(err_resp);
		}
	});
}

/*
Middleware functions for api/users/*
*/

exports.addUser = function(req,res){
	var user = req.body;
	console.log(user);
	User.create(user,function(str){
		res.send(str);
	});
}

exports.getUserById = function(req,res){
	verify.isReqAuthentic(req,function(response,session){
		if(response){

		}
		else{

		}
	});
}

exports.loginUser = function(req,res){
	var params = req.body;
	var obj = {
		'email' : params.email,
		'password' : params.password
	};
	User.login(obj,function(str,session){
		var response = JSON.parse(str);
		console.log(str);
		console.log(session);
		console.log(req.session);
		if(response.status){
			console.log('Calling from indexJS ~188, session id is ',session._id);
			req.session.session_id = session._id;
			var obj = {
				'status' : true,
				'message' : "login successful",
				'data' : session
			}
			res.send(JSON.stringify(obj));
			console.log("NO error");
		}
		else{
			res.send(str);
			console.log("error");
		}
	});
}

exports.logoutUser = function(req,res){
	verify.isReqAuthentic(req,function(response,session){
		if(response){

		}
		else{

		}
	});
}

exports.removeUser = function(req,res){
	verify.isReqAuthentic(req,function(response,session){
		if(response){

		}
		else{

		}
	});
}

exports.updateUserName = function(req,res){
	verify.isReqAuthentic(req,function(response,session){
		if(response){

		}
		else{

		}
	});
}

exports.updateUserPassword = function(req,res){
	verify.isReqAuthentic(req,function(response,session){
		if(response){

		}
		else{

		}
	});
}

// exports.extraFunction = function(req,res){
// 	verify.isReqAuthentic(req,function(response,session){
// 		if(response){

// 		}
// 		else{

// 		}
// 	});
// }