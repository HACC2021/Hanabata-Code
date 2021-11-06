import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Trails } from '../../api/trail/Trail';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  image: String,
  location: String,
  length: String,
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
  }
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddTrail extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, image, location, length, difficulty, busyTime, price, description } = data;
    const owner = Meteor.user().username;
    Trails.collection.insert({ name, image, location, length, difficulty, busyTime, price, description, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Add Trail</Header>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
            <Segment>
              <TextField name='name'/>
              <TextField name='image'/>
              <TextField name='location'/>
              <TextField name='length'/>
              <SelectField name='difficulty'/>
              <TextField name='busyTime'/>
              <SelectField name='price'/>
              <TextField name='description'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

export default AddTrail;