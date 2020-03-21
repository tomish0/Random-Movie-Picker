import React, { Component } from "react";
import RandomPick from "./RandomPick"
import { Route, Link } from "react-router-dom";
import "../Styles/Movie.css";


class Movie extends Component {
  state = {
    favourites: []
  };

  render() {
    const movies = this.props.movieData.movies;
    const favourites = this.state.favourites;
    console.log(favourites);
    return (
      <div>
        <div>
          <h1>Favourite Movies</h1>
          <button
            onClick={() => {
              let favourites = [...this.state.favourites];
              let randomFilm = favourites[Math.floor(Math.random() * favourites.length)]
              console.log(randomFilm);
              return <Route exact path='/random-pick' component={RandomPick} randomFilm={randomFilm}/>
            }}
          >
           <Link to="/random-pick">Pick Film</Link> 
          </button>
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
        <h1>All Movies</h1>
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
