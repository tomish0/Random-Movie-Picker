import React, { Component } from "react";
import "../Styles/RandomPicks.css";

class RandomPick extends Component {
  state = {};
  render() {
    console.log(this.props);

    return (
      <div className="random-pick-main">
        <div className="title">
          <strong>{this.props.randomMovie.title}</strong>{" "}
          <small>({this.props.randomMovie.year})</small>
        </div>
        <div className="random-pick-main-wrapper">
          <div>
            <img
              src={this.props.randomMovie.posterUrl}
              alt={this.props.randomMovie.title}
            ></img>
          </div>
          <div className="details">
            <div className="director">
              <strong>Director:</strong> {this.props.randomMovie.director}
            </div>
            {/* Actors are in a string, not array, can't map */}
            <div className="actor">
              <strong>Actors:</strong> {this.props.randomMovie.actors}
            </div>
            <div className="runtime">
              <strong>Runtime:</strong> {this.props.randomMovie.runtime} mins
            </div>
            <div className="genres">
              <strong>Genres:</strong>
              {this.props.randomMovie.genres.map((genre, i) => {
                return (
                  <ul key={i}>
                    <li>{genre}</li>
                  </ul>
                );
              })}
            </div>
            <div className="plot">
              <strong>Plot:</strong> {this.props.randomMovie.plot}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RandomPick;
