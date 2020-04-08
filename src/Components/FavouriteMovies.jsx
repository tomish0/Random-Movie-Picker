import React, { Component } from "react";

class FavouriteMovies extends Component {
  render() {
    // show all favourite movies 
    // remove button on each favFilm that removes it from array at specific index, i
    // calls removeFavMovie in App, sending up the new current state of favourites
    // and the favFilm that is being removed 
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
                      favourites.splice([i], 1);
                      this.props.removeFavMovie(favourites, favFilm);
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
