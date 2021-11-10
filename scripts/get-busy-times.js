import pkg from 'mongodb';
const { MongoClient } = pkg;
import config from './config.js';

import fetch from 'node-fetch';

const apiKeyPublic = config.besttimes_public_key;
const apiKeyPrivate = config.besttimes_private_key;

copyData();

async function copyData() {
    let jsonUrl = "https://besttime.app/api/v1/forecasts/weekoverview?";
    let client = new MongoClient("mongodb://127.0.0.1:3001/meteor");

    console.log('connecting to mongo');
    await client.connect();
    console.log('connected to mongo');

    let trails = await client.db().collection("TrailsCollection").find({ island:"OAHU" }).toArray();
    let trail = trails[0];

    let queryOptions = { 
        'api_key_private': apiKeyPrivate,
        'venue_id': ''
    };
    // queryOptions.venue_id = trail.venueInfo.venue_id;
    for (let trail of trails) {
        queryOptions.venue_id = trail.venuInfo.venue_id;

        let params = new URLSearchParams(queryOptions);
        
        let response = await fetch(`https://besttime.app/api/v1/forecasts/week/raw?${params}`, { method: 'GET' });
        let responseJson = await response.json();

        console.log(responseJson);
        break;
    }
    await client.close();

};