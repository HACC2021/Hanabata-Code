import populartimes
from pymongo import MongoClient
from pprint import pprint

client = MongoClient("mongodb://127.0.0.1:3001/meteor")
key = "AIzaSyD6e5T2lb274s5mDoj_vE5h_fX9Wg6oSxI"

db=client.meteor
# Issue the serverStatus command and print the results
serverStatusResult=db.command("serverStatus")

trails = db.TrailsCollection.find({ "island": "OAHU"})

for trail in trails:
    print(trail['name'])
    placeId = trail['googlePlace']['place_id']
    result = populartimes.get_id(key, placeId)

    db.TrailsCollection.update_one({'_id': trail['_id']}, { '$set': { 'googlePlaceData': result}})
