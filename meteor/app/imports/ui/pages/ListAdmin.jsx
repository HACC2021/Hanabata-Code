import React from "react";
import { Meteor } from "meteor/meteor";
import { Container, Table, Header, Loader, Button } from "semantic-ui-react";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { UserInfo } from '../../api/userinfo/UserInfo';
import { Stuffs } from '../../api/stuff/Stuff';
import swal from "sweetalert";

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
        <Header as="h2" textAlign="center">
        List Users (Admin)
      </Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User</Table.HeaderCell>
            {Roles.userIsInRole(Meteor.userId(), "superAdmin") && (
              <Table.HeaderCell>Is Admin</Table.HeaderCell>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.props.userinfo.map(
            (listuser) =>
              Meteor.userId() != listuser._id && (
                <Table.Row key={listuser._id}>
                  <Table.Cell>{listuser.username}</Table.Cell>
                  {Roles.userIsInRole(Meteor.userId(), "superAdmin") && (
                    <Table.Cell>
                      {listuser.isAdmin ? (
                        <Button
                          onClick={() =>
                            Meteor.call(
                              "removeAdmin",
                              listuser._id,
                              (error, result) =>
                                error
                                  ? swal(
                                      "Error",
                                      "Are you sure you have admin role?",
                                      "error"
                                    )
                                  : swal("Success", result, "success")
                            )
                          }
                        >
                          Yes
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            Meteor.call(
                              "makeAdmin",
                              listuser._id,
                              (error, result) =>
                                error
                                  ? swal(
                                      "Error",
                                      "Are you sure you have admin role?",
                                      "error"
                                    )
                                  : swal("Success", result, "success")
                            )
                          }
                        >
                          No
                        </Button>
                      )}
                    </Table.Cell>
                  )}
                </Table.Row>
              )
          )}
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
  const subs = Meteor.subscribe("AllUsers");
  return {
    userinfo: Meteor.users.find().fetch(),
    ready: subscription.ready() && subs.ready(),
  };
})(ListAdmin);
