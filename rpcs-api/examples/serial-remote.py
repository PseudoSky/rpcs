import serial
import requests


host = {
    "ip":"http://128.2.20.131",
    "port": 50000,
    "endpoint":"users"
}

def get_vals(host):
        r = requests.get("http://{}:{}/{}".format(host["ip"],host["port"],host["endpoint"]))
        print r.text
        return r.json()

def post(host, data):
        r = requests.post("http://{}:{}/{}".format(host["ip"],host["port"],host["endpoint"]), data=data)
        print r.status_code,r.reason,r.text
        return r.text



# Create a user
user = {
    "first":"Frank",
    "last":"Abagnale Jr.",
    "address":"1000 Forbes Ave",
    "phone":"7072345555"
}
post(host,user)
print get_vals(host)[0]

# Post a value
sample_val = {
    "sensor":'hilbert',
    "value":'1.8'
}
host['endpoint']="values?limit=1"
post(host,sample_val)


# Get A value
get_vals(host)
