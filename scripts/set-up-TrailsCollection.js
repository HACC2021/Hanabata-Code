import pkg, { ObjectId } from "mongodb";
const { MongoClient } = pkg;
import fetch from "node-fetch";

import { readFile } from "fs/promises";

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
  console.log("getting trails from JSON file");
  const jsonTrails = JSON.parse(
    await readFile(
      new URL("../meteor/config/TrailsCollection.json", import.meta.url)
    )
  );

  console.log("connecting to mongo");
  await client.connect();
  console.log("connected to mongo");

  let trailsCollection = client.db().collection("TrailsCollection");

  console.log("downloaded json, got hikes: ", jsonTrails.length);

  // {name: trail.name,
  //     island: trail.island,
  //     idKey: trail.idKey,
  //     // image: { type: String, optional: true },
  //     // defaultImage: {
  //     //   type: String,
  //     //   optional: true,
  //     // },
  //     coords: trail.coords,
  //     // openHour: {
  //     //   type: String,
  //     //   allowedValues: [
  //     //     '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
  //     //     '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
  //     //   ],
  //     //   defaultValue: '5',
  //     // },
  //     // openMinute: {
  //     //   type: String,
  //     //   allowedValues: ['00', '15', '30', '45'],
  //     //   defaultValue: '00',
  //     // },
  //     // open: {
  //     //   type: String,
  //     //   allowedValues: ['AM', 'PM'],
  //     //   defaultValue: 'AM',
  //     // },
  //     // closeHour: {
  //     //   type: String,
  //     //   allowedValues: [
  //     //     '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
  //     //     '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24',
  //     //   ],
  //     //   defaultValue: '16',
  //     // },
  //     // closeMinute: {
  //     //   type: String,
  //     //   allowedValues: ['00', '15', '30', '45'],
  //     //   defaultValue: '00',
  //     // },
  //     // close: {
  //     //   type: String,
  //     //   allowedValues: ['AM', 'PM'],
  //     //   defaultValue: 'AM',
  //     // },
  //     lengthMiles: trail.lengthMiles,
  //     lengthKm: trail.lengthKm,
  //     elevationFeet: trail.elevationFeet,
  //     elevationMeters: trail.elevationMeters,
  //     // difficulty: {
  //     //   type: String,
  //     //   allowedValues: ['Easy', 'Normal', 'Hard', 'Very Hard', 'Extreme', 'Undefined'],
  //     //   defaultValue: 'Normal',
  //     // },
  //     // busyTime: {
  //     //   type: String,
  //     //   allowedValues: ['08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00'],
  //     //   defaultValue: '12:00 - 14:00',
  //     // },
  //     // price: {
  //     //   type: String,
  //     //   allowedValues: ['Free', 'Entrance Fees'],
  //     //   defaultValue: 'Free',
  //     // },
  //     // description: String,
  //     // owner: {
  //     //   type: String,
  //     //   optional: true,
  //     // },}

  for (let trail of jsonTrails) {
    let temp = {
      name: trail.name,
      island: trail.island,
      idKey: trail.idKey,
      lengthMiles: trail.lengthMiles,
      lengthKm: trail.lengthKm,
      elevationFeet: trail.elevationFeet,
      elevationMeters: trail.elevationMeters,
      difficulty: trail.difficulty || "Normal",
      description: trail.description,
      location: trail.location,
      image: trail.image,
      busyTime: trail.busyTime,
      price: trail.price,
      openHour: trail.openHour,
      openMinute: trail.openMinute,
      closeHour: trail.closeHour,
      closeMinute: trail.closeMinute,
      coords: {
        latitude: trail.coords.latitude,
        longitude: trail.coords.longitude,
      },
      traffics:{
          google: trail.googlePlaceData?.populartimes,
          best: trail.bestTimeData?.week_raw
      }
    };

    let result = await trailsCollection.insertOne(temp);
    if (result.upsertedId) {
      console.log("inserted new trail ", temp);
    } else {
      console.log("replaced trail ", temp);
    }
  }

  await client.close();
}
