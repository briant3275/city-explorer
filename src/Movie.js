import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

class Movie extends React.Component {
  render() {
    let movieInfo = this.props.movieInfo;
    return (
      <ListGroup.Item>
        {movieInfo.title}: {movieInfo.overview}, release date: {movieInfo.release}, rating: {movieInfo.rating}, votes: {movieInfo.votes}.
      </ListGroup.Item>
    );
  }
}

export default Movie;