import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: "",
      movies: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.onChangeMovies = this.onChangeMovies.bind(this);
  }
  componentDidMount() {
    this.source = axios.CancelToken.source();
    axios.get(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies`, { cancelToken: this.source.token })
      .then(res => {

        this.setState({ movies: res.data });

      })
      .catch((e) => {
      })
  }
  componentWillUnmount() {
    this.source.cancel();
  }
  handleClick(e) {
    const id = e.target.dataset.id
    const movies = this.state.movies;
    console.log('this is:', e.target.dataset.id);
    axios.delete(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/` + id, { cancelToken: this.source.token })
      .then(res => {
        if (res.status === 204) {
          const index = movies.findIndex(x => x.id === id);
          if (index >= 0) {
            // const newMovies = [...movies.slice(0, index), ...movies.slice(index + 1)];
            // movies.splice(index, 1);
            this.setState((prevState) => ({
              movies: [...prevState.movies.slice(0, index), ...prevState.movies.slice(index + 1)],
            }));
          };
        }
      })
      .catch((e) => {
      })
  }
  onChangeMovies(e) {
    this.setState({ query: e.target.value });
  }

  render() {
    const filteredMovies = 
    this.state.movies.filter(movie => movie.title.toLowerCase().includes(this.state.query.toLowerCase()));
    return (
      <div className="App">
       <Helmet>
        <title>Home</title>
      </Helmet>
        <div className="container container__margin" >
          <input 
          type="text" 
          className="input" 
          value={this.state.query}
          onChange={this.onChangeMovies}
          placeholder="Search..." />
          <table className="table  table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Director</th>
                <th>Rating</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie) => (
                <tr key={movie.id} className="movie">
                  <td>
                    <Link to={"/detailspage/" + movie.id}>{movie.title}</Link>
                  </td>
                  <td><span>{movie.description}</span></td>
                  <td><span>{movie.director}</span></td>
                  <td><span>{movie.rating}</span></td>
                  <td className="edit_delete_button">

                    <button type="button" className="btn btn-info"><Link to={"/editmovie/" + movie.id} >Edit</Link></button>
                    <button onClick={(e) => this.handleClick(e)} data-id={movie.id} type="button" className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default Home
