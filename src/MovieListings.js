import React from "react";
import Movie from "./Movie";
import { ListGroup, Container } from "react-bootstrap";

class MovieListings extends React.Component {
    render() {
        let movieData = this.props.movieData;
        let movieListInfo = movieData.map((movieInfo, idx) => (
            <Movie key={idx} movieInfo={movieInfo} />
        ));
        return (
            <Container>
                <ListGroup className="m-md-auto w-50">
                    {movieListInfo}
                </ListGroup>
                <h3>{this.props.movieErrorAlert}</h3>
            </Container>
        );
    }
}

export default MovieListings;