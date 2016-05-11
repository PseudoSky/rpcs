var sensors = require("../models/sensors.js");

exports.init = function (app) {

	app.get("/seed/sensors", seed);
	app.get("/sensors/:sensor_id?", getSensors);
	app.post("/sensors", postSensor);
	// app.get("/sensors", getAllSensor);

}

var seed = function(req,res){
	var seed_sensors=require("../models/seed/sensors");
	console.log('Sensor seeds',seed_sensors);
	sensors.truncate(function(){
		for(var i in seed_sensors){
			sensors.insert(seed_sensors[i]);
		}
		res.send('Seeded')
	})

}

var getSensors = function (req, res) {
	var opts=req.query;
	opts['sort']={name:1};
	opts['limit']=parseInt(req.params["limit"]||req.query.limit ||20)
	if (req.params.sensor_id != undefined) {
		
		sensors.show(req.params.sensor_id,opts, function (sensors) {
			if(!sensors)res.status(400).send({"message":"sensors"});
			else{
				res.status(200).send(sensors);
			}
		});
		
	} else {
		
		sensors.index(opts,function (sensors) {
			if(!sensors)res.status(400).send({"message":"sensors"});
			else{
				res.status(200).send(sensors);
			}
		});
		
	}

}

var postSensor = function (req, res) {

	var name = req.body.name||req.query.name;
	var fullname = req.body.fullname||req.query.fullname;
	var description = req.body.description||req.query.description;
	var active = req.body.active||req.query.active;
	
	sensors.create(name, fullname,description, active, function () {
		res.status(200).send({"message":"Added Sensor to the System"});

	});

}