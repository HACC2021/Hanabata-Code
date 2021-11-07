import React, { createRef } from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Trails } from '../../api/trail/Trail';
import UploadImg from '../components/UploadImg';
import { extractFileType, uploadImg, createImg } from '../../api/uploadImg';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
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
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddTrail extends React.Component {
  constructor(props) {
    super(props);
    this.imgRef = createRef();
  }

  // On submit, insert the data.
  submit(data, formRef) {
    const image = this.imgRef.current
      ? extractFileType(this.imgRef.current)
      : '';
    const { name, location, length, difficulty, busyTime, price, description } = data;
    const owner = Meteor.user().username;

    Trails.collection.insert(
      { name, image, location, length, difficulty, busyTime, price, description, owner },
      (error, id) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          if (this.imgRef.current) {
            const file = createImg(this.imgRef.current, id);
            uploadImg(file);
          }
          swal('Success', 'Trail added successfully', 'success');
          formRef.reset();
        }
      },
    );
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
              <TextField name='location'/>
              <TextField name='length'/>
              <SelectField name='difficulty'/>
              <TextField name='busyTime'/>
              <SelectField name='price'/>
              <LongTextField name='description'/>
              <UploadImg imgRef={this.imgRef} />
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
