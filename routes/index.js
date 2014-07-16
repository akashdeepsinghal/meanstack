module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./app/index.html');
	});

};

exports.give = function(req,res){
	var str = '<?xml version="1.0"?><!DOCTYPE cross-domain-policy SYSTEM "http://www.adobe.com/xml/dtds/cross-domain-policy.dtd"><cross-domain-policy><site-control permitted-cross-domain-policies="master-only"/><allow-access-from domain="*" secure="false"/><allow-http-request-headers-from domain="*" headers="*" secure="false"/></cross-domain-policy>';
	res.contentType('application/xml');
	res.send(str);
}