import React, { Component } from "react";
import "../Styles/Movie.css";

class AllMovies extends Component {
  state = {};
  render() {
    const movies = this.props.movieData.movies;
    const filteredFilms = this.props.filteredFilms;
    return (
      <div>
        <div>
          {filteredFilms.length > 0
            ? filteredFilms.map((filteredFilm, i) => {
                return (
                  <div className="movie-wrapper" key={i}>
                    <div className="each-movie">{filteredFilm.title}</div>
                    <button
                      onClick={() => {
                        let favourites = [...this.props.favourites];
                        if (!favourites.includes(filteredFilm.title)) {
                          favourites.unshift(filteredFilm.title)
                        }
                        this.props.addFavMovie(favourites);
                      }}
                    >
                      Add to Favourites
                    </button>
                  </div>
                );
              })
            : movies.map((movie, i) => {
                return (
                  <div className="movie-wrapper" key={i}>
                    <div className="each-movie">{movie.title}</div>
                    <button
                      onClick={() => {
                        let favourites = [...this.props.favourites];
                        if (!favourites.includes(movie.title)) {
                          favourites.unshift(movie.title);
                        }
                        this.props.addFavMovie(favourites);
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
