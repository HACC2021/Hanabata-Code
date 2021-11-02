import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Card } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Trails } from '../../api/trail/Trail';
import { AllTrailCourseAdmin } from '../components/AllTrailCourseAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListTrailAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
        <Container>
          <div className="align-center-mode">
            <Header as="h1" textAlign="center">All Trails (Admin)</Header>
            <Card.Group>
              {this.props.trails.map((trail) => <AllTrailCourseAdmin key={trail._id} trail={trail} Trails={Trails}/>)}
            </Card.Group>
          </div>
        </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
ListTrailAdmin.propTypes = {
  trails: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Trails.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const trails = Trails.collection.find({}).fetch();
  return {
    trails,
    ready,
  };
})(ListTrailAdmin);
