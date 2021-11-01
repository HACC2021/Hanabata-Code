import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Hikes } from '../../api/hike/Hike';
import HikeItemAdmin from '../components/HikeItemAdmin';

/** Renders a table containing all of the Hike documents. Use <HikeItem> to render each row. */
class ListHikeAdmin extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center">List Hike (Admin)</Header>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Condition</Table.HeaderCell>
              <Table.HeaderCell>Owner</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.hikes.map((hike) => <HikeItemAdmin key={hike._id} hike={hike} />)}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

// Require an array of Hike documents in the props.
ListHikeAdmin.propTypes = {
  hikes: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Hike documents.
  const subscription = Meteor.subscribe(Hikes.adminPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Hike documents
  const hikes = Hikes.collection.find({}).fetch();
  return {
    hikes,
    ready,
  };
})(ListHikeAdmin);
