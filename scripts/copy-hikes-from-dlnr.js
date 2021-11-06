import pkg from 'mongodb';
const { MongoClient } = pkg;

import fetch from 'node-fetch';
copyData();

async function copyData() {
    let jsonUrl = "https://hawaiitrails.hawaii.gov/trails/api/trail";
    let client = new MongoClient("mongodb://127.0.0.1:3001/");

    console.log('connecting to mongo');
    // await client.connect();
    console.log('connected to mongo');

    //download json from url 
    let response = await fetch(jsonUrl);
    let json = await response.json();

    console.log('downloaded json, got hikes: ',json.data.length);

    //serialize to hike models
    for (let obj of json.data) {
        console.log(obj);
    }

    //insert into db 
};