import pkg, { ObjectId } from 'mongodb';
const { MongoClient } = pkg;
import fetch from 'node-fetch';

import { readFile } from 'fs/promises';

/**
 * 
 * This script will set up the trails collection by either inserting or 
 * replacing trail data from the file meteor/config/TrailsCollection.json
 * 
 * This script should be run when setting up the application for the first time
 * 
 * 
 */

importJson();

async function importJson() {
    let client = new MongoClient("mongodb://127.0.0.1:3001/meteor");

    //get trails from JSON
    console.log('getting trails from JSON file');
    const jsonTrails = JSON.parse(await readFile(
        new URL('../meteor/config/TrailsCollection.json', import.meta.url)
    ));

    console.log('connecting to mongo');
    await client.connect();
    console.log('connected to mongo');

    let trailsCollection = client.db().collection("TrailsCollection");

    for (let trail of jsonTrails) {
        delete trail._id;
        let result = await trailsCollection.replaceOne({ idKey: trail.idKey }, trail, { upsert: true });
        if (result.upsertedId) {
            console.log("inserted new trail ", trail.name);
        }
        else {
            console.log("replaced trail ", trail.name);
        }
    }

    await client.close();
};