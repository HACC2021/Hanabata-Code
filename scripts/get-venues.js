import pkg from 'mongodb';
const { MongoClient } = pkg;

import fetch from 'node-fetch';
copyData();

async function copyData() {
    let jsonUrl = "https://besttime.app/api/v1/venues/search?";
    let client = new MongoClient("mongodb://127.0.0.1:3001/meteor");
    let count = 0;

    console.log('connecting to mongo');
    await client.connect();
    console.log('connected to mongo');
    let trails = await client.db().collection("TrailsCollection").find({island: "OAHU"}).toArray();

    for (let trail of trails) {
        let queryOptions = { 
            'api_key_private': 'PRIVATE_API_KEY',
            'q': '',
            'fast': false,
            'lat': 0.0,
            'lng': 0.0,
            'num': 1,
            'radius': 300
        }
        console.log(` getting ${trail.name}`);
        
        queryOptions.q = trail.name.normalize("NFD").replace(/[\u0300-\u036f\'\`\u02BB\u2018]/g, "") + " in hawaii USA";
        queryOptions.lat = trail.coords.latitude.toFixed(3);
        queryOptions.lng = trail.coords.longitude.toFixed(3);
        
        let params = new URLSearchParams(queryOptions);
        let url = jsonUrl + params;
        
        console.log(' searching with ', queryOptions);
        
        let response = await fetch(url, { method: 'POST' });
        let jsonResponse = await response.json();
        
        let progressRequestParams = { 'job_id': jsonResponse.job_id, 'collection_id': jsonResponse.collection_id } 
        
        const venueUrl = "https://besttime.app/api/v1/venues/progress?";
        let progressResponse = await (await fetch(venueUrl + new URLSearchParams(progressRequestParams), { method: 'GET'})).json();
        
        while (!progressResponse.job_finished) {
            await new Promise(r => setTimeout(r, 2000));
            console.log("checking again...", progressResponse);
            progressResponse = await (await fetch(venueUrl + new URLSearchParams(progressRequestParams), { method: 'GET'})).json();
        }
        
        console.log(" done working on ", trail.name, count++);
        console.log(progressResponse);

        await client.db().collection("TrailsCollection").updateOne({ _id: trail._id }, {$set: {'venueInfo': progressResponse.venues[0] } });
    }

    await client.close();
};