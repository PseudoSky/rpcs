/* User Class Declaration */
var mongoose = require('mongoose');
var User = mongoose.model('User', {
	first:String,
	last:String,
	gender:String,
	dob:String,
	phone :String,
	mobile:String,
	email:String,
	address1:String,
	address2:String,
	city:String,
	state:String,
	zipcode:String,
	timestamp: { type : Date, default: Date.now }
});



exports.model=User;
/* Model Functions */

exports.index = function (opts,callback) {
	User.find({},{},opts,function (error, users) {
		if (error) {
			return console.error(error);
		}

		callback(users);
	}).select('-__v');

}
exports.index_after = function (_id,timestamp, callback) {

	User.find({_id:_id},function (error, users) {
		if (error) {
			return console.error(error);
		}
		var vals;
		if(timestamp){
			vals=Value.find({user_id:_id}).sort({timestamp:-1}).where('timestamp').gt(new Date(timestamp) ).select('-__v');
		}else{

			vals=Value.find({user_id:_id}).sort({timestamp:-1}).where('timestamp').select('-__v');
		}

		callback(vals);
	})

}

exports.show = function (_id, opts, callback) {

	User.find({
		_id: _id
	},{},opts, function (error, users) {
		if (error) {
			return console.error(error);
		}

		callback(users);
	}).select('-__v');

}

exports.truncate = function (callback){
	User.remove({},callback);
}

exports.insert = function (record, callback) {
	var user = new User(record);
	if(user.user!=0){
		user.save(function (error,u) {
			if (error) {
				console.error(error);
			}
			if(callback){
				callback(error,u);
			}else{
				return 1;
			}
		});
	}
}
