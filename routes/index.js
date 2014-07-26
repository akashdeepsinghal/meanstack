
/*
 * GET home page.
 */
var verify = require('../api/verify.js');

exports.index = function(req, res){
	verify.loginVerify(req,function(response,session){
		if(response){
			var csrf = session[0].csrf;
			console.log('csrf token',csrf);
			res.render('index.html', { title: 'Tripsphere', csrf_token : csrf });
		}
		else{
			res.redirect('/');
		}
	});
};

exports.show = function(req,res){
	verify.loginVerify(req,function(response){
		console.log('line22')
		console.log(response);
		if(response){
			console.log('response');
			res.redirect('/blog');
		}
		else{
			res.render('index.html', { title: 'Login to Tripsphere', csrf_token : '' });
		}
	});
}

exports.give = function(req,res){
	var str = '<?xml version="1.0"?><!DOCTYPE cross-domain-policy SYSTEM "http://www.adobe.com/xml/dtds/cross-domain-policy.dtd"><cross-domain-policy><site-control permitted-cross-domain-policies="master-only"/><allow-access-from domain="*" secure="false"/><allow-http-request-headers-from domain="*" headers="*" secure="false"/></cross-domain-policy>';
	res.contentType('application/xml');
	res.send(str);
}