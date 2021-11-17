import React, { createRef } from 'react';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
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
  island: String,
  location: String,
  openHour: {
    type: String,
    allowedValues: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    defaultValue:'5',
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
  lengthMiles: String,
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
    const { name, island, location, openHour, openMinute, open, closeHour, closeMinute, close, lengthMiles, difficulty, busyTime, price, description } = data;
    const owner = Meteor.user().username;

    Trails.collection.insert(
      { name, island, image, location, openHour, openMinute, open, closeHour, closeMinute, close, lengthMiles, difficulty, busyTime, price, description, owner },
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
              <TextField name='island'/>
              <TextField name='location'/>
              <Form.Group>
                <SelectField name='openHour'/>
                <SelectField name='openMinute'/>
                <SelectField name='open'/>
              </Form.Group>
              <Form.Group>
                <SelectField name='closeHour'/>
                <SelectField name='closeMinute'/>
                <SelectField name='close'/>
              </Form.Group>
              <TextField name='lengthMiles'/>
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
