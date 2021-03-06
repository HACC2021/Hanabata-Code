import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class CheckInsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'CheckInsCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
    this.allPublicationName = `${this.name}.publication.temp`;
  }
}

export const CheckIns = new CheckInsCollection();
