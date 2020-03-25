import React, { Component } from "react";

class FavouriteMovies extends Component {
  state = {};

  render() {
    const favourites = this.props.favourites;
    return (
        <div className="favourites-container">
          <h2>Favourite Movies</h2>
          <div className="movie-wrapper">
            {favourites.map((favFilm, i) => {
              return (
                <div className="each-movie" key={i}>
                  <strong>{favFilm.title}</strong> ({favFilm.year})
                  <button
                    onClick={() => {
                      let favourites = [...this.props.favourites];
                      favourites.splice([i], 1);
                      this.props.removeFavMovie(favourites);
                    }}
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        </div>
    );
  }
}

export default FavouriteMovies;
