import React, { Component } from "react";
import "../Styles/Movie.css";

class AllMovies extends Component {
  state = {
      favourites: []
  };
  render() {
    const movies = this.props.movieData.movies;
    return (
      <div>
        <h1>All Movies</h1>
        
        <div>
          {movies.map((movie, i) => {
            return (
              <div className="movie-wrapper" key={i}>
                <div className="each-movie">{movie.title}</div>
                <button
                  onClick={() => {
                    let favourites = [...this.props.favourites];
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

export default AllMovies;
