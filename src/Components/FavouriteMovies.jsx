import React, { Component } from "react";

class FavouriteMovies extends Component {
  state = {};

  render() {
    const favourites = this.props.favourites;
    return (
      <div>
        <div>
          <h1>Favourite Movies</h1>
          {favourites.map((favFilm, i) => {
            return (
              <div className="movie-wrapper" key={i}>
                <div className="each-movie">{favFilm}</div>
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
