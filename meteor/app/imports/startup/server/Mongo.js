import { Meteor } from 'meteor/meteor';
import { Hikes } from '../../api/hike/Hike.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Hikes.collection.insert(data);
}

// Initialize the HikesCollection if empty.
if (Hikes.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
