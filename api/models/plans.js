var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var PlanSchema = new Schema({
	author : { type : String},
	name : { type : String},
	location : { type : String},
	category : [{type : String}],
	uppercap : { type : Number},
	duration : { type : Number},
	basic_cost : { type : Number},
	difficulty : { type : String},
	description : {
		short : { type : String},
		long : { type : String}
	},
	season : {
		best : [{type : String}],
		worst : [{type : String}]
	},
	facilities : [{type : String}],
	distance : {
		land : { type : Number},
		height : { type : Number},
		water : { type : Number}
	},
	carry : [{type : String}],
	instructions : [{type : String}],
	pains : [{type : String}],
	addons : [{
		name : { type : String},
		price : { type : Number}
	}],
	created_on : { type : String, default : Date() }
});

module.exports = mongoose.model('Plan',PlanSchema);