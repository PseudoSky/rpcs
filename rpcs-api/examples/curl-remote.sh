curl -X POST "http://128.2.20.131:50000/users" -d "first=Frank&last=Abagnale Jr&address=1000 Forbes Ave&phone=707"

curl -X POST "http://128.2.20.131:50000/sensors" -d 'name=heart&fullname=Heart Rate&description=Heart rate sensing'

curl -X POST "http://128.2.20.131:50000/values?sensor_id=123&value=1&user_id=570ec6cc4784043b5285c3ac"


curl "http://128.2.20.131:50000/users"
curl "http://128.2.20.131:50000/users?limit=1"
# [
#   {
#     "_id": "570ef1564e99b98e7acabf83",
#     "first": "Frank",
#     "last": "Abagnale Jr",
#     "address": "1000 Forbes Ave",
#     "phone": "707",
#     "timestamp": "2016-04-14T01:24:38.341Z"
#   }
# ]

curl "http://128.2.20.131:50000/sensors"
curl "http://128.2.20.131:50000/sensors?limit=1"
# [
#   {
#     "_id": "570bc867328e9f315c11758a",
#     "name": "ch4",
#     "fullname": "Methane",
#     "description": "The amount of ambient light",
#     "__v": 0,
#     "active": true
#   }
# ]

curl "http://128.2.20.131:50000/values/since/2016-04-13T22:40:03.827Z"

curl "http://128.2.20.131:50000/sensors?limit=1"
# [
#   {
#     "_id": "570bc867328e9f315c11758a",
#     "name": "ch4",
#     "fullname": "Methane",
#     "description": "The amount of ambient light",
#     "__v": 0,
#     "active": true
#   }
# ]

curl "http://128.2.20.131:50000/values/since/2016-04-13T22:40:03.827Z"

# [
#   {
#     "value": 1.8,
#     "timestamp": "2016-04-14T01:03:47.286Z"
#   },
#   {
#     "value": 1.8,
#     "timestamp": "2016-04-14T01:03:14.979Z"
#   },
#   {
#     "value": 1.8,
#     "timestamp": "2016-04-14T01:02:14.305Z"
#   },
#   ...
# ]

curl "http://128.2.20.131:50000/values?limit=10"
# [
#   {
#     "value": 1.8,
#     "timestamp": "2016-04-14T01:03:47.286Z"
#   },
#   {
#     "value": 1.8,
#     "timestamp": "2016-04-14T01:03:14.979Z"
#   },
#   {
#     "value": 1.8,
#     "timestamp": "2016-04-14T01:02:14.305Z"
#   },
#   {
#     "value": 1.8,
#     "timestamp": "2016-04-14T01:01:59.027Z"
#   },
#   {
#     "value": 1.8,
#     "timestamp": "2016-04-14T01:00:37.161Z"
#   },
#   {
#     "value": 1.8,
#     "timestamp": "2016-04-14T01:00:10.211Z"
#   },
#   {
#     "value": 1.8,
#     "timestamp": "2016-04-14T00:09:56.162Z"
#   },
#   {
#     "value": 1.8,
#     "timestamp": "2016-04-14T00:09:32.127Z"
#   },
#   {
#     "value": 1.8,
#     "timestamp": "2016-04-14T00:09:11.260Z"
#   },
#   {
#     "value": 1.8,
#     "timestamp": "2016-04-14T00:07:58.869Z"
#   }
# ]
