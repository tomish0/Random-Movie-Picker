import React, { Component } from "react";
import RandomPick from "./RandomPick";
import { Route, Link, Switch } from "react-router-dom";
import "../Styles/Movie.css";
import GenreFilter from "./GenreFilter";

class Movie extends Component {
  state = {
    favourites: []
  };

  findRandomFilm = () => {
    const favourites = this.state.favourites;
    let randomFilm = favourites[Math.floor(Math.random() * favourites.length)];
    return randomFilm;
  };

  render() {
    const movies = this.props.movieData.movies;
    const favourites = this.state.favourites;
    return (
      <div>
        <div>
          <br />
          <Link to="/">Home</Link>
          <h1>Favourite Movies</h1>
          <Link to="/random-pick" onClick={() => this.findRandomFilm()}>
            Pick A Random Movie From Your Favourites
          </Link>
          {favourites.map((favFilm, i) => {
            return (
              <div className="movie-wrapper" key={i}>
                <div className="each-movie">{favFilm}</div>
                <button
                  onClick={() => {
                    let favourites = [...this.state.favourites];
                    favourites.splice([i], 1);
                    this.setState({ favourites });
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <Switch>
          <Route
            exact
            path="/random-pick"
            component={() => <RandomPick randomFilm={this.findRandomFilm()} />}
          />
          <Route exact path="/" />
        </Switch>
        <h1>All Movies</h1>
        <GenreFilter movieData={this.props.movieData} />
        <div>
          {movies.map((movie, i) => {
            return (
              <div className="movie-wrapper" key={i}>
                <div className="each-movie">{movie.title}</div>
                <button
                  onClick={() => {
                    let favourites = [...this.state.favourites];
                    favourites.unshift(movie.title);
                    this.setState({ favourites });
                  }}
                >
                  Add to Favourites
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Movie;
