var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
	name : String,
	email : { type : String, required : true, unique : true },
	password : { type : String, required : true },
	active : { type : Boolean, default : false },
	created_on : { type : String, default : Date() },
	picture : { type : String }
});

module.exports = mongoose.model('Tribe',UserSchema);