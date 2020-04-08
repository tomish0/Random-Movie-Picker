import React, { Component } from "react";
import "../Styles/RandomPicks.css";

class RandomPick extends Component {
  render() {
    // show the randomly chosen movie once link has been clicked
    const randomMovie = this.props.randomMovie;
    return (
      <div className="random-pick-main">
        <div className="title">
          <strong>{randomMovie.title}</strong>{" "}
          <small>({randomMovie.year})</small>
        </div>
        <div className="random-pick-main-wrapper">
          <div className='img-container'>
            <img
              src={randomMovie.posterUrl}
              alt={randomMovie.title}
            ></img>
          </div>
          <div className="details">
            <div className="director">
              <strong>Director:</strong> {randomMovie.director}
            </div>
            {/* Actors are in a string, not array, can't map */}
            <div className="actor">
              <strong>Actors:</strong> {randomMovie.actors}
            </div>
            <div className="runtime">
              <strong>Runtime:</strong> {randomMovie.runtime} mins
            </div>
            <div className="genres">
              <strong>Genres:</strong>
              {randomMovie.genres.map((genre, i) => {
                return (
                  <ul key={i}>
                    <li>{genre}</li>
                  </ul>
                );
              })}
            </div>
            <div className="plot">
              <strong>Plot:</strong> {randomMovie.plot}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RandomPick;
