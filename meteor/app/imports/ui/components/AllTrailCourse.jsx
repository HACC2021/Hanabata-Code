import React from 'react';
import { Card, Image, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
export class AllTrailCourse extends React.Component {
  render() {
    return (
      <Card>
        <Image src={this.props.trail.image} wrapped ui={false} />
        <Card.Content>
          <Card.Header as='h2'>{this.props.trail.name}</Card.Header>
          <Card.Description><strong>{this.props.trail.location}</strong></Card.Description>
          <Card.Meta>
            <span>{this.props.trail.length}</span>
          </Card.Meta>
          <Card.Description>
            Difficulty: {this.props.trail.difficulty}
          </Card.Description>
          <Card.Description>
            Busy Time: {this.props.trail.busyTime}
          </Card.Description>
          <Card.Description>
            Price: {this.props.trail.price}
          </Card.Description>
          <br />
          <Card.Description>
            Description: {this.props.trail.description}
          </Card.Description>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
AllTrailCourse.propTypes = {
  trail: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    length: PropTypes.string,
    difficulty: PropTypes.string,
    busyTime: PropTypes.string,
    price: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(AllTrailCourse);
