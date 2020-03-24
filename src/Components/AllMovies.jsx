import React, { Component } from "react";
import "../Styles/Movie.css";
import "../Styles/RandomPicks.css";

class AllMovies extends Component {
  state = {};
  render() {
    const movies = this.props.movieData.movies;
    const filteredFilms = this.props.filteredFilms;
    console.log(movies[1]);
    return (
      <div>
        <div className="random-pick-main">
          <div className="title">
            <strong>{movies[1].title}</strong> <small>({movies[1].year})</small>
          </div>
          <div className="random-pick-main-wrapper">
            <div>
              <img src={movies[1].posterUrl} alt={movies[1].title}></img>
            </div>
            <div className="details">
              <div>{movies[1].runtime} mins</div>
              <h3>Genres</h3>
              <div>
                {movies[1].genres.map((genre, i) => {
                  return (
                    <div key={i}>
                      <div>{genre}</div>
                    </div>
                  );
                })}
              </div>
              <div>{movies[1].director}</div>
              {/* Actors are in a string, not array, can't map */}
              <div>{movies[1].actors}</div>
              <div>{movies[1].plot}</div>
            </div>
          </div>
        </div>
        <div>
          {filteredFilms.length > 0
            ? filteredFilms.map((filteredFilm, i) => {
                return (
                  <div className="movie-wrapper" key={i}>
                    <div className="each-movie">
                      <strong>{filteredFilm.title}</strong> ({filteredFilm.year}
                      )
                    </div>
                    <button
                      onClick={() => {
                        let favourites = [...this.props.favourites];
                        if (!favourites.includes(filteredFilm)) {
                          favourites.unshift(filteredFilm);
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
                    <div className="each-movie">
                      <strong>{movie.title}</strong> ({movie.year})
                    </div>
                    <button
                      onClick={() => {
                        let favourites = [...this.props.favourites];
                        if (!favourites.includes(movie)) {
                          favourites.unshift(movie);
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
