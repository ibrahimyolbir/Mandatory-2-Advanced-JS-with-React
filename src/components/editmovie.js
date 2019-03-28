import React, { Component } from 'react';
import axios from 'axios';
import { Helmet } from "react-helmet";
import 'materialize-css/dist/css/materialize.min.css';

export default class EditMovie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: null,
            finished: false
        };
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDirector = this.onChangeDirector.bind(this);
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.source = axios.CancelToken.source();
        const { id } = this.props.match.params;
        console.log(id);

        axios.get(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${id}`, { cancelToken: this.source.token })
            .then(res => {
                this.setState({ movie: res.data });

            })
            .catch((e) => {
            })
    }

    componentWillUnmount() {
        this.source.cancel();
    }
    onChangeTitle(e) {
        const movie = { ...this.state.movie };
        movie.title = e.target.value;
        this.setState({ movie });
        console.log(movie.title);
    }
    onChangeDescription(e) {
        const movie = { ...this.state.movie };
        movie.description = e.target.value;
        this.setState({ movie });
        console.log(movie.description);
    }
    onChangeDirector(e) {
        const movie = { ...this.state.movie };
        movie.director = e.target.value;
        this.setState({ movie });
        console.log(movie.director);
    }
    onChangeRating(e) {
        const movie = { ...this.state.movie };
        movie.rating = parseInt(e.target.value) || 0;
        this.setState({ movie });
        console.log(movie.rating);
    }
    onSubmit(e) {
        e.preventDefault();
        const { movie } = this.state;
        console.log(movie);
        const { id } = this.props.match.params;
        this.source = axios.CancelToken.source();
        axios.put(`http://ec2-13-53-132-57.eu-north-1.compute.amazonaws.com:3000/movies/${id}`, movie, { cancelToken: this.source.token })
            .then(response => {
                this.setState({ finished: true });
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    return;
                }
            });
    }
    render() {
        const movie = this.state.movie
        // const finished = this.state
        console.log(movie);
        // if (finished) {
        //     return <Redirect to="/" />;
        // }
        return (
            <div className="edit__movie">
                <Helmet>
                    <title>Edit Movie</title>
                </Helmet>
                <h1> Edit Movie</h1>
                {movie ? (
                    <form onSubmit={this.onSubmit} className="editmovie__form">
                        <label>
                            <div>title</div>
                            <input
                                type="text"
                                value={movie.title}
                                onChange={this.onChangeTitle}
                                maxLength={40}
                            />
                        </label>

                        <label>
                            <div>Director</div>
                            <input
                                type="text"
                                value={movie.director}
                                onChange={this.onChangeDirector}
                                maxLength={40}
                            />
                        </label>
                        <label>
                            <div>description</div>
                            <textarea
                                type="textarea"
                                value={movie.description}
                                onChange={this.onChangeDescription}
                                maxLength={40}
                            />
                        </label>
                        <label>
                            <div>Rating</div>
                            <p className="range-field">
                                <input
                                    type="range"
                                    min={0}
                                    max={5}
                                    id="test5"
                                    value={movie.rating}
                                    onChange={this.onChangeRating}
                                    maxLength={40}
                                />
                            </p>
                        </label>

                        <button type="submit">Save</button>
                    </form>
                ) : (
                        <p>loading</p>
                    )}
            </div>
        )
    }
}

