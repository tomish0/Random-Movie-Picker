import React, { Component } from "react";

class AllMovies extends Component {
  state = {};
  render() {
    const movies = this.props.movieData.movies;
    const filteredFilms = this.props.filteredFilms;
    return (
      <div className="all-movies">
        {filteredFilms.length > 0 ? (
          <div className="movie-wrapper">
            {filteredFilms.map((filteredFilm, i) => {
              return (
                <div className="each-movie" key={i}>
                  <strong>{filteredFilm.title}</strong> ({filteredFilm.year})
                  <button
                    onClick={() => {
                      this.props.addFavMovie(filteredFilm);
                    }}
                  >
                    Add to Favourites
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="movie-wrapper">
            {movies.map((movie, i) => {
              return (
                <div className="each-movie" key={i}>
                  <strong>{movie.title}</strong> ({movie.year})
                  <button
                    onClick={() => {
                      this.props.addFavMovie(movie);
                    }}
                  >
                    Add to Favourites
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default AllMovies;
