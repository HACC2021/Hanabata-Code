import React, { createRef } from 'react';
import { Grid, Loader, Header, Segment, Form } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField, SelectField, SubmitField, TextField, LongTextField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Trails } from '../../api/trail/Trail';
import UploadImg from '../components/UploadImg';
import { createImg, extractFileType, uploadImg } from '../../api/uploadImg';

const bridge = new SimpleSchema2Bridge(Trails.schema);

/** Renders the Page for editing a single document. */
class EditTrail extends React.Component {
  constructor(props) {
    super(props);
    this.imgRef = createRef();
  }

  // On successful submit, insert the data.
  submit(data) {
    let { name, island, idKey, image, location, openHour, openMinute, open, closeHour, closeMinute, close, lengthMiles, difficulty, busyTime, price, description, _id } = data;
    image = this.imgRef.current ? extractFileType(this.imgRef.current) : (image || '');
    Trails.collection.update(
      _id,
      { $set: { name, island, idKey, image, location, openHour, openMinute, open, closeHour, closeMinute, close, lengthMiles, difficulty, busyTime, price, description } },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          if (this.imgRef.current) {
            const file = createImg(this.imgRef.current, _id);
            uploadImg(file);
          }
          swal('Success', 'Trail updated successfully', 'success');
        }
      },
    );
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    return (
      <Grid container centered>
        <Grid.Column>
          <Header as="h2" textAlign="center">Edit Trail</Header>
          <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
            <Segment>
              <TextField name='name'/>
              <TextField name='location'/>
              <Form.Group>
                <SelectField name='openHour'/>
                <SelectField name='openMinute'/>
                {/* <SelectField name='open'/> */}
              </Form.Group>
              <Form.Group>
                <SelectField name='closeHour'/>
                <SelectField name='closeMinute'/>
                {/* <SelectField name='close'/> */}
              </Form.Group>
              <TextField name='lengthMiles'/>
              <SelectField name='difficulty'/>
              <SelectField name='busyTime'/>
              <SelectField name='price'/>
              <LongTextField name='description'/>
              <UploadImg imgRef={this.imgRef} />
              <SubmitField value='Submit'/>
              <ErrorsField/>
              <HiddenField name='owner' />
              <HiddenField name='idKey' />
              <HiddenField name="image" />
            </Segment>
          </AutoForm>
        </Grid.Column>
      </Grid>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditTrail.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Trails.adminPublicationName);
  // Determine if the subscription is ready
  // const ready = subscription.ready();
  // Get the document
  // const doc = Trails.collection.findOne(documentId);
  return {
    doc: Trails.collection.findOne(documentId),
    ready: subscription.ready(),
  };
})(EditTrail);
