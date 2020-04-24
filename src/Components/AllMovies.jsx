import React, { Component } from "react";

class AllMovies extends Component {
  render() {
    /* if there are filteredFilms & genreSelection isn't All then show the filteredFilms
     each film has button that calls addFavMovie in App to add movie to favourites array */
    /* if a genre has been selected, thus showing filteredFilms array, but the array is empty
    and the genre isn't either nothing or All,
    then show message;
    solves issue of selecting genre and reverting to allMovies array - logic below */
    /* else, show all movies */
    const { allMovies, filteredFilms, genreSelection } = this.props;
    return (
      <div className="all-movies">
        {filteredFilms.length > 0 && genreSelection !== "All" ? (
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
        ) : filteredFilms.length === 0 &&
          genreSelection !== "All" &&
          genreSelection !== "" ? (
          <div className="filter-empty-message">
            {genreSelection} Movies are your Favourites!
          </div>
        ) : (
          <div className="movie-wrapper">
            {allMovies.map((movie, i) => {
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
