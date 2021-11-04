import { Meteor } from 'meteor/meteor';
import { Trails } from '../../api/trail/Trail.js';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Trails.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Trails.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
