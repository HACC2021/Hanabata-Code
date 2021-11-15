import pkg from 'mongodb';

const { MongoClient } = pkg;

import fetch from 'node-fetch';
copyData();

async function copyData() {
    let jsonUrl = "https://hawaiitrails.hawaii.gov/trails/api/trail";
    let client = new MongoClient("mongodb://127.0.0.1:3001/meteor");

    console.log('connecting to mongo');
    await client.connect();
    console.log('connected to mongo');

    //download json from url 
    let response = await fetch(jsonUrl);
    let json = await response.json();

    console.log('downloaded json, got hikes: ',json.data.length);

    //serialize to hike models
    for (let obj of json.data) {
        let newTrail = {
            idKey: obj.idKey,
            name: obj.name,
            island: obj.island,
            image: "https://media.istockphoto.com/photos/two-hikers-enjoying-beautiful-view-picture-id1089175126?k=20&m=1089175126&s=612x612&w=0&h=8sW6gTeLEt0ujzNSfdxZRRSOjE1TAZJzR9qWPmQgOOk=",
            difficulty: obj.difficulty,
            lengthMiles: obj.lengthMiles,
            lengthKm: obj.lengthKm,
            elevationFeet: obj.elevationFeet,
            elevationMeters: obj.elevationMeters,
            coords: obj.coords,
            closed: obj.closed
        }
        console.log("inserting ", obj.name);
        await client.db().collection('TrailsCollection').insertOne(newTrail);
    }
    await client.close();

    //insert into db 
};