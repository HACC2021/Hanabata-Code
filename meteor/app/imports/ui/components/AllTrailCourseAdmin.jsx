import React from 'react';
import { Button, Card, Feed, Icon, Image, Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import fetchImg from '../../api/fetchImg';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
export class AllTrailCourseAdmin extends React.Component {
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

  removeItem(docID) {
    // eslint-disable-next-line no-console
    swal({
      title: 'Delete Trail',
      text: 'Do you really want to delete this trail?\n It will be deleted from Trail list.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.props.Trails.collection.remove(docID);
          swal('Delete successful', {
            icon: 'success',
          });
        } else {
          swal('Delete cancelled');
        }
      });
  }

  render() {
    return (
      <Card>
        <Image src={this.props.trail.defaultImage || this.state.image}/>
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
        <Card.Content extra>
          <Feed>
            <Link to={`/edit/${this.props.trail._id}`}>
                Edit <Icon name="edit" />
            </Link>
            <Button
              floated="right"
              size="mini"
              icon
              onClick={() => this.removeItem(this.props.trail._id)}
            >
              <Icon name="trash" />
            </Button>
          </Feed>
        </Card.Content>
      </Card>
    );
  }
}

// Require a document to be passed to this component.
AllTrailCourseAdmin.propTypes = {
  trail: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    openHour: PropTypes.string,
    openMinute: PropTypes.string,
    open: PropTypes.string,
    closeHour: PropTypes.string,
    closeMinute: PropTypes.string,
    close: PropTypes.string,
    lengthMiles: PropTypes.number,
    difficulty: PropTypes.string,
    busyTime: PropTypes.string,
    price: PropTypes.string,
    description: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
  Trails: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(AllTrailCourseAdmin);
