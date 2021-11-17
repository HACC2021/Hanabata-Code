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
        idKey: { type: String, optional: true },
        image: { type: String, optional: true },
        defaultImage: {
          type: String,
          optional: true,
        },
        location: String,
        openHour: {
          type: String,
          allowedValues: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          defaultValue: '5',
        },
        openMinute: {
          type: String,
          allowedValues: [
            '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
            '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
            '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
            '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
            '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
            '50', '51', '52', '53', '54', '55', '56', '57', '58', '59',
          ],
          defaultValue: '00',
        },
        open: {
          type: String,
          allowedValues: ['AM', 'PM'],
          defaultValue: 'AM',
        },
        closeHour: {
          type: String,
          allowedValues: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          defaultValue: '6',
        },
        closeMinute: {
          type: String,
          allowedValues: [
            '00', '01', '02', '03', '04', '05', '06', '07', '08', '09',
            '10', '11', '12', '13', '14', '15', '16', '17', '18', '19',
            '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
            '30', '31', '32', '33', '34', '35', '36', '37', '38', '39',
            '40', '41', '42', '43', '44', '45', '46', '47', '48', '49',
            '50', '51', '52', '53', '54', '55', '56', '57', '58', '59',
          ],
          defaultValue: '00',
        },
        close: {
          type: String,
          allowedValues: ['AM', 'PM'],
          defaultValue: 'AM',
        },
        lengthMiles: Number,
        lengthKm: { type: Number, optional: true },
        elevationFeet: { type: Number, optional: true },
        elevationMeters: { type: Number, optional: true },
        difficulty: {
          type: String,
          allowedValues: ['Easy', 'Normal', 'Hard', 'Very Hard', 'Extreme', 'Undefined'],
          defaultValue: 'Normal',
        },
        busyTime: {
          type: String,
          optional: true,
        },
        price: {
          type: String,
          allowedValues: ['Free', 'Entrance Fees'],
          defaultValue: 'Free',
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
