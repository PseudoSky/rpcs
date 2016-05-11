/* Value Class Declaration */
Schema = mongoose.Schema

var Value = mongoose.model('Value', {
	sensor_id: String,
	user_id:{ type: Schema.ObjectId, ref:'User' },
	timestamp: { type : Date, default: Date.now },
	meta: Object,
	value: Number
});
exports.model=Value;
/* Model Functions */

exports.index = function (opts,callback) {
	console.log('OPTS',opts);
	opts=opts || {sort:{timestamp:-1},limit:200}
	Value.find({},{},opts,function (error, values) {
		if (error) {
			return console.error(error);
		}

		callback(values);
	}).select('-__v -_id');

}
exports.index_after = function (timestamp,opts, callback) {

	Value.find({},{},opts,function (error, values) {
		if (error) {
			return console.error(error);
		}

		callback(values);
	}).where('timestamp').gt(new Date(timestamp) ).select('-__v -_id');

}

exports.show = function (sensor_id, opts, callback) {

	Value.find({
		sensor_id: sensor_id
	},{},opts, function (error, values) {
		if (error) {
			return console.error(error);
		}

		callback(values);
	}).select('-__v -_id -sensor_id');

}

exports.truncate = function (callback){
	Value.remove({},callback);
}

exports.insert = function (record, callback) {
	console.log('R',record);
	if(!record.user_id){
		// record.user_id=default_user;
		console.log('NO USER');
	}
	var value = new Value(record);
	if(value.value!=0){
		value.save(function (error) {
			if (error) {
				console.error(error);
			}
			if(callback){
				callback();
			}else{
				return 1;
			}
		});
	}
}

exports.create = function (sensor_id, user_id,value, callback) {

	var value = new Value({
		user_id:user_id,
		sensor_id: sensor_id,
		value: value
	});

	value.save(function (error) {
		if (error) {
			console.error(error);
		}

		callback();
	});

}