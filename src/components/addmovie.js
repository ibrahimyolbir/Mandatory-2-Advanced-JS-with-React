import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { Helmet } from "react-helmet";
class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      info: {
        title: "",
        director: "",
        rating: "",
        description: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const info = { ...this.state.info };
    info[e.currentTarget.id] = e.currentTarget.value;
    this.setState({ info });
  }


  onClick = () => {
    this.source = axios.CancelToken.source();
    let info = this.state.info
    axios.post(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/`, info, { cancelToken: this.source.token })
      .then(res => {
        const movies = res.data;
        this.setState({ movies });
        this.setState({ finished: true });
        console.log(movies)
      })
      .catch((e) => {
      })
  }


  render() {
    const { title, director, rating, description, } = this.state.info;
    const { finished } = this.state;
    if (finished) {
      return <Redirect to="/" />;
    }
    return (
      <div className="add__movie">
        <Helmet>
          <title>Add Movie</title>
        </Helmet>
        <div>
          <label htmlFor="title">title</label>
          <input
            placeholder="Title"
            value={title}
            id="title"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="director">Director</label>
          <input
            placeholder="Director"
            value={director}
            id="director"
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="rating">Rating</label>
          <input
            placeholder="Rating"
            value={rating}
            type="range"
            id="rating"
            max={5}
            min={0}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">description</label>
          <textarea
            placeholder="description"
            value={description}
            id="description"
            onChange={this.handleChange}
          />
        </div>
        <button className="btn" onClick={this.onClick} disabled={this.state.disabled}>Save</button><br />
      </div>
    );
  }
}
export default AddMovie;
