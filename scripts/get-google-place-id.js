import googlePkg from '@googlemaps/google-maps-services-js';
import mongoPkg from 'mongodb';
import config from './config'

const { Client } = googlePkg;
const { MongoClient } = mongoPkg;

getGooglePlaceIds();

async function getGooglePlaceIds() {

    const googleClient = new Client({});
    let mongoClient = new MongoClient("mongodb://127.0.0.1:3001/meteor");
    await mongoClient.connect();

    let trails = await mongoClient.db().collection("TrailsCollection").find({ island: "OAHU" }).toArray();

    for (let trail of trails) {
        console.log(' searching for ', trail.name);

        try {
            let result = await googleClient.textSearch({
                params: {
                    query: `${trail.name} honolulu hawaii`,
                    key: config.google_private_key,
                },
                timeout: 1000, // milliseconds
            });

            let topResult = result.data.results[0];
            await mongoClient.db().collection("TrailsCollection").updateOne({ _id: trail._id }, { $set: { 'googlePlace': topResult } });
        } catch (err) {
            console.log('error with ', trail.name);
            console.log(err);
            await mongoClient.db().collection("TrailsCollection").updateOne({ _id: trail._id }, { $set: { 'googlePlace': { error: true } } });
        }
    }
    await mongoClient.close();
}