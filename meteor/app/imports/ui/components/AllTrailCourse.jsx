import React from 'react';
import { Card, Image, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import fetchImg from '../../api/fetchImg';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
export class AllTrailCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '/images/meteor-logo.png',
    };
  }

  componentDidMount() {
    if (this.props.trail.image) {
      fetchImg(this.props.trail._id + this.props.trail.image).then((res) => this.setState({ image: res }));
    } else if (this.props.trail.defaultImage) {
      this.setState({ image: this.props.trail.defaultImage });
    }
  }

  render() {
    return (
      <Card>
        <Image src={this.props.trail.defaultImage || this.state.image}/>
        <Card.Content>
          <Card.Header as='h2'><Link to={{ pathname: '/'}}>{this.props.trail.name}</Link></Card.Header>
          <Card.Description><strong>{this.props.trail.location}</strong></Card.Description>
          <Card.Meta>
            <span>{this.props.trail.lengthMiles} miles</span>
          </Card.Meta>
          <Card.Description>
            Open/Close: {this.props.trail.openHour}:{this.props.trail.openMinute} - {this.props.trail.closeHour}:{this.props.trail.closeMinute}
          </Card.Description>
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
