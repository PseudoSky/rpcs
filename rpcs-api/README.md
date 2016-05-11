# UDBS Air Quality Sensor

This is the server side package used for processing and serving sensor data between the hardware and Web Endpoint.

![](https://github.com/PseudoSky/udbs-air-sense/blob/master/docs/physical/hardware.jpg)

## References:

Server		https://github.com/PseudoSky/udbs-air-sense

Client		https://github.com/PseudoSky/sense-ui

## Dependencies:

Arduino Uno

Nodejs		https://nodejs.org/en/
Mongodb	https://www.mongodb.org/
Git		https://git-scm.com/


## Install:

```
mkdir udbs
cd udbs
git clone https://github.com/PseudoSky/udbs-air-sense

npm install -g yo grunt bower grunt-cli

cd udbs-air-sense

mongod

# Open new shell window to same dir

npm install

node server.js
```

## Use:

Check out the examples in `examples` dir

On first run, the db should generate seed data.
This will add the test seed data that we gathered from the sensor to the MongoDB instance.

	app.get("/sensors/:sensorID?", getSensors);
	app.post("/sensors", postSensor);

	app.get("/values/since/:timestamp", getValuesSince);
	app.get("/values/:sensor_id?", getValues);
	app.post("/values", postValue);

	app.get("/users/values/since/:timestamp", getUsersSince);
	app.get("/users/values/:user_id?", getV4U);
	app.get("/users/:user_id?",getUsers)

# API Endpoints

### /seed  

Endpoint for seeding the initial local database
![](https://github.com/PseudoSky/udbs-air-sense/blob/master/docs/images/seed.png)

### /values  

Endpoint for all values from all sensors
![](https://github.com/PseudoSky/udbs-air-sense/blob/master/docs/images/values.png)

### /values/since/:timestamp  

Endpoint for all sensor data after timestamp
![](https://github.com/PseudoSky/udbs-air-sense/blob/master/docs/images/values-since.png)

Endpoint for butane sensor readings

### /values/ch4  

Endpoint for methane
![](https://github.com/PseudoSky/udbs-air-sense/blob/master/docs/images/values-ch4.png)

### /values/co  

Endpoint for carbon monoxide
![](https://github.com/PseudoSky/udbs-air-sense/blob/master/docs/images/values-co.png)

### /values/h  

Endpoint for humidity
![](https://github.com/PseudoSky/udbs-air-sense/blob/master/docs/images/values-h.png)

### /values/lpg  

Endpoint for butane/propane
![](https://github.com/PseudoSky/udbs-air-sense/blob/master/docs/images/values-lpg.png)

### /values/lux  

Endpoint for light intensity
![](https://github.com/PseudoSky/udbs-air-sense/blob/master/docs/images/values-lux.png)

### /values/p  

Endpoint for atmospheric pressure
![](https://github.com/PseudoSky/udbs-air-sense/blob/master/docs/images/values-p.png)


### /values/t  

Endpoint for temperature in Celcius
![](https://github.com/PseudoSky/udbs-air-sense/blob/master/docs/images/values-t.png)

### /sensors  

Lists all sensors
NOT YET IMPLEMENTED
