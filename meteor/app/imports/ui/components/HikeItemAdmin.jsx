import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

/** Renders a single row in the List Hike (Admin) table. See pages/ListHikeAdmin.jsx. */
class HikeItemAdmin extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.hike.name}</Table.Cell>
        <Table.Cell>{this.props.hike.quantity}</Table.Cell>
        <Table.Cell>{this.props.hike.condition}</Table.Cell>
        <Table.Cell>{this.props.hike.owner}</Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
HikeItemAdmin.propTypes = {
  hike: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    condition: PropTypes.string,
    _id: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default HikeItemAdmin;
