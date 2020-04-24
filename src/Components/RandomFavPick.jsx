import React, { Component } from "react";
import "../Styles/RandomPicks.css";

class RandomFavPick extends Component {
  render() {
    // show the randomly chosen favourite movie once link has been clicked
    const randomFavMovie = this.props.randomFavMovie;
    return (
      <div className="random-pick-main">
        <div className="title">
          <strong>{randomFavMovie.title}</strong>{" "}
          <small>({randomFavMovie.year})</small>
        </div>
        <div className="random-pick-main-wrapper">
          <div className="img-container">
            <img
              src={randomFavMovie.posterUrl}
              alt={randomFavMovie.title}
            ></img>
          </div>
          <div className="details">
            <div className="director">
              <strong>Director:</strong> {randomFavMovie.director}
            </div>
            <div className="actor">
              <strong>Actors:</strong> {randomFavMovie.actors}
            </div>
            <div className="runtime">
              <strong>Runtime:</strong> {randomFavMovie.runtime} mins
            </div>
            <div className="genres">
              <strong>Genres:</strong>
              {randomFavMovie.genres.map((genre, i) => {
                return (
                  <ul key={i}>
                    <li>{genre}</li>
                  </ul>
                );
              })}
            </div>
            <div className="plot">
              <strong>Plot:</strong> {randomFavMovie.plot}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RandomFavPick;
