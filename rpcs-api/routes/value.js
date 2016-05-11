var Value = require("../models/values.js");
var u = require("../models/users.js");
var User=mongoose.model('User'),
			queryString = require('querystring');
var default_user;
console.log('User',User);
/*
 * Export an init method that will define a set of routes
 * handled by this file.
 * @param app - The Express app
 */
function get_default(cb){
	User.find({},function(err,u){
		default_user=u._id;
		console.log('U',err,u);
		if (cb){
			cb( default_user);
		}
	})
}
var seed_u=function(cb) {
	var seed_user=require("../models/seed/users");
	var u_t;
	User.remove(function(){
		User.create(seed_user,cb); 

		
	});
	// body...
}
var seed = function(req,res){
	User.count({},function(erroru,u_count){
		if(u_count<1){

		
			var seed_data=require("../models/seed/data");
			seed_u(function(err,userz){
				console.log('EU',err,userz);
				default_user=userz[0]._id;
				// User.find().limit(1).exec(function(err,u){


				// console.log(def,etc);
				// body...
				Value.model.count({},function(errorc,c){
					if(c<10){
						Value.truncate(function(){
							for(var i in seed_data){
								seed_data[i]["sensor_id"]=seed_data[i]["sensorID"];
								seed_data[i]["user_id"]=default_user;
								delete seed_data[i]["sensorID"];
								
							}
							Value.model.create(seed_data,function(e,x){console.log('EX',e,x);});

						})
					}
				})
			});
		}
	})

}
exports.init = function (app) {

	app.get("/values/since/:timestamp", getValuesSince);
	app.get("/values/:sensor_id?", getValues);
	app.post("/values", postValue);
	app.post("/estimote", postEstimote);
	app.get("/seed",seed)
	app.get("/seed/users",seed_u)
	if(app.locals.seed){
		seed();
	}

}

var getValuesSince = function (req, res) {
	var opts=req.query;

	opts['sort']={timestamp:-1};
	opts['limit']=parseInt(req.params["limit"]||req.query.limit ||200)
	if (req.params.timestamp != undefined) {
		var ts=new Date(req.params.timestamp);
		if(ts){
			Value.index_after(ts,opts, function (values) {
				res.status(200).send(values);
			});

		}else{
			res.status(400).send({"message":"Invalid Timestamp"});
		}

	} else {

		Value.index(opts,function(values) {
			res.status(200).send(values);
		});
	}

}

var getValues = function (req, res) {
	var opts=req.query;
	opts['sort']={timestamp:-1};
	opts['limit']=parseInt(req.params["limit"]||req.query.limit ||200)
	if (req.params.sensor_id != undefined) {

		Value.show(req.params.sensor_id, opts, function (values) {
			res.status(200).send(values);
		});

	} else {

		Value.index(opts,function(values) {
			res.status(200).send(values);
		});
	}

}

var postValue = function (req, res) {
	console.log('Dat',req.query,req.body,req.params);
	var sensor_id = req.query.sensor_id || req.body.sensor_id;
	var user_id=req.query.user_id || req.body.user_id||default_user;
	var value = req.query.value || req.body.value;

	if(typeof value != typeof 0){
		value=parseFloat(value)
	}

	Value.model.create({
		user_id:user_id,
		sensor_id: sensor_id,
		value: value
	}, function (err) {
		if(err) res.status(400).send({"message":"error in value post email sky"});
		else{
			res.status(200).send({});
		}
	});

}

var postEstimote=function(req, res){
	console.log('Dat',req.query,req.body,req.params);
	var sensor_id = "estimote";
	var user_id=req.query.user_id || req.body.user_id||default_user;
	var meta = req.body || req.query;

	Value.model.create({
		user_id:user_id,
		sensor_id: sensor_id,
		meta:meta
	}, function (err,v) {
		if(err) res.status(400).send({"message":"error in value post email sky"});
		else{
			res.status(200).send(v);
		}
	});
}

module.exports.seed=seed;
module.exports.seed_u=seed_u;
module.exports.post_vals=postValue;
module.exports.values_since=getValuesSince;
module.exports.values=getValues;