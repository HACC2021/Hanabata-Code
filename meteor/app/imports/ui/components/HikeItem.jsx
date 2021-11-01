import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Hike table. See pages/ListHike.jsx. */
class HikeItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.hike.name}</Table.Cell>
        <Table.Cell>{this.props.hike.quantity}</Table.Cell>
        <Table.Cell>{this.props.hike.condition}</Table.Cell>
        <Table.Cell>
          <Link to={`/edit/${this.props.hike._id}`}>Edit</Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
HikeItem.propTypes = {
  hike: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(HikeItem);
