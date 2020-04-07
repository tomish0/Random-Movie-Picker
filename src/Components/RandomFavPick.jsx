import React, { Component } from "react";
import "../Styles/RandomPicks.css";

class RandomFavPick extends Component {
  render() {
    return (
      <div className="random-pick-main">
        <div className="title">
          <strong>{this.props.randomFavMovie.title}</strong>{" "}
          <small>({this.props.randomFavMovie.year})</small>
        </div>
        <div className="random-pick-main-wrapper">
          <div className="img-container">
            <img
              src={this.props.randomFavMovie.posterUrl}
              alt={this.props.randomFavMovie.title}
            ></img>
          </div>
          <div className="details">
            <div className="director">
              <strong>Director:</strong> {this.props.randomFavMovie.director}
            </div>
            {/* Actors are in a string, not array, can't map */}
            <div className="actor">
              <strong>Actors:</strong> {this.props.randomFavMovie.actors}
            </div>
            <div className="runtime">
              <strong>Runtime:</strong> {this.props.randomFavMovie.runtime} mins
            </div>
            <div className="genres">
              <strong>Genres:</strong>
              {this.props.randomFavMovie.genres.map((genre, i) => {
                return (
                  <ul key={i}>
                    <li>{genre}</li>
                  </ul>
                );
              })}
            </div>
            <div className="plot">
              <strong>Plot:</strong> {this.props.randomFavMovie.plot}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RandomFavPick;
