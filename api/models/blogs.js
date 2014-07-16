var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var BlogSchema = new Schema({
	title : { type : String, required : true },
	author : { type : String, default : 'Team Tripsphere' },
	created_on : { type : String, default : Date() },
	year : { type : Number, required :true },
	month : { type : Number, required :true },
	date : { type : Number, required :true },
	content : { type : String, required : true },
	publish : {type : Boolean, default : true},
	urlName : { type : String, required : true }
});

module.exports = mongoose.model('Blog',BlogSchema);