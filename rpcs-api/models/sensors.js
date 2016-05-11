/* Sensor Class Declaration */

var Sensor = mongoose.model('Sensor', {
	name: String,
	fullname:String,
	description: String,
	active: {type:Boolean,default:true}
});

/* Model Functions */

exports.index = function (opts,callback) {
	
	Sensor.find({},{},opts,function (error, sensors) {
		if (error) {
			return console.error(error);
		}
		
		callback(sensors);
	});

}

exports.show = function (name,opts, callback) {
	
	Sensor.find({
		name: name
	},{},opts, function (error, sensors) {
		if (error) {
			return console.error(error);
		}
		
		callback(sensors);
	});

}

exports.create = function (name,fullname, description, active, callback) {

	var s = new Sensor({
		name: name,
		fullname: fullname,
		description: description,
		active: active
	});

	s.save(function (error) {
		if (error) {
			console.error(error);
		}
		
		callback();
	});

}

exports.insert = function (record, callback) {
	var el = new Sensor(record);
	if(el.name!=0){
		el.save(function (error) {
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

exports.truncate = function (callback){
	Sensor.remove({},callback);
}