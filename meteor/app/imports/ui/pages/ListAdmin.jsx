import React from "react";
import { Meteor } from "meteor/meteor";
import { Container, Table, Header, Loader } from "semantic-ui-react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { UserInfo } from '../../api/userinfo/UserInfo';
import { Stuffs } from '../../api/stuff/Stuff';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListAdmin extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return this.props.ready ? (
        this.renderPage()
    ) : (
        <Loader active>Getting data</Loader>
    );
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">List Admins</Header>
          <Table>
            <Table.Header><Table.Row>
              <Table.HeaderCell>User Name</Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.userinfo.map((listuser) => <Table.Row key={listuser._id}>
                <Table.Cell>{listuser.user}</Table.Cell>
              </Table.Row>) }
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListAdmin.propTypes = {
  userinfo: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = Meteor.subscribe('UserInfo');
  const ready = subscription.ready();
  return {
    userinfo: UserInfo.find({}).fetch(),
    ready,
  };
})(ListAdmin);
