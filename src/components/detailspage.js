import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

class DetailsPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movie: null
    }
  }
  componentDidMount() {
    this.source = axios.CancelToken.source();

    const { id } = this.props.match.params;

    axios.get(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${id}`, { cancelToken: this.source.token })
      .then(res => {
        const movies = res.data;
        this.setState({ movie: res.data });
        console.log(movies)
      })
      .catch((e) => {
      })
  }

  componentWillUnmount() {
    this.source.cancel();
  }

  render() {
    const { movie } = this.state;
    if (movie === null) {
      return <p>Fetching movie...</p>;
    }
    return (
      <>
        <Helmet>
          <title>DetailsPage</title>
        </Helmet>
        <div className="details__movie">
          <h4>Title</h4>
          <p> {movie.title}</p>
          <h4>Director</h4>
          <p>{movie.director}</p>
          <h4>Description</h4>
          <p>{movie.description}</p>
          <h4>Rating</h4>
          <p>{movie.rating}</p>
          <button type="button" className="btn btn-info"><Link to={"/editmovie/" + movie.id} >Edit</Link></button>
        </div>
        
      </>
    );
  }
}
export default DetailsPage
