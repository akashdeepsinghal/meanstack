var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserTermSchema = new Schema({
	user_id : { type : String, required : true },
	start_time :{ type : String, required : true },
	end_time : String,
	active : { type : Boolean, default : true },
	csrf : { type : String, required : true }
});

module.exports = mongoose.model('UserTerm',UserTermSchema);