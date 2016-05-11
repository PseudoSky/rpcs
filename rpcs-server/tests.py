from db_definitions import *
from pony.orm import *
from datetime import *
import random

db = Database("sqlite", "database.sqlite", create_db=True)

db.generate_mapping(create_tables=True)


# Need this to run opperations on the db
@db_session
def test_values():

	# This iterator should work on all tables
	users=select(p for p in User)[:]

	# Creates a user with an autogenerated id
	u1=User( first='Frank', last='Abagnale', phone="7071234567")

	# Creates or gets a sensor for heart rate
	s1=Sensor.get(name='heart') or Sensor(name='heart')

	# Insert ~100 random heart rate values
	for i in range(100):
		# For some reason you need to feed it 'time'
		Value(sensor=s1 , user=u1,time=datetime.now(),value=random.random()*10+90)

	# Get the heart rate values back from db
	#     The tuple denotes the selected fields
	vals=select((v.value,v.time) for v in Value)[:]
	for x in vals:

		print("Heart Rate: "+str(x[0])+" bpm at: "+str(x[1]))




test_values()