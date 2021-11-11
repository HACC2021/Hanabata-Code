import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class TrailsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'TrailsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema(
      {
        name: String,
        island: String,
        idKey: String,
        image: { type: String, optional: true },
        defaultImage: { type: String, optional: true },
        location: String,
        lengthMiles: Number,
        lengthKm: Number,
        elevationFeet: Number,
        elevationMeters: Number,
        difficulty: {
          type: String,
          allowedValues: ['Easy', 'Normal', 'Hard', 'Very Hard', 'Extreme'],
          defaultValue: 'Normal',
        },
        busyTime: String,
        price: {
          type: String,
          allowedValues: ['$', '$$', '$$$'],
          defaultValue: '$',
        },
        description: String,
        owner: {
          type: String,
          optional: true,
        },
      },
      { tracker: Tracker },
    );
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.allPublicationName = `${this.name}.publication.temp`;
  }
}

export const Trails = new TrailsCollection();
