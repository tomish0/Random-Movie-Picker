import React, { Component } from "react";
import "../Styles/RandomPicks.css";

class RandomPick extends Component {
  state = {};
  render() {
    console.log(this.props);

    return (
      <div className="random-pick-wrapper">
        <div>{this.props.randomMovie.title}</div>
        <div>{this.props.randomMovie.year}</div>
        <div>{this.props.randomMovie.runtime}</div>
        <div>{this.props.randomMovie.genres}</div>
        <div>{this.props.randomMovie.director}</div>
        <div>{this.props.randomMovie.actors}</div>
        <div>{this.props.randomMovie.plot}</div>
        <img
          src={this.props.randomMovie.posterUrl}
          alt={this.props.randomMovie.title}
        ></img>
      </div>
    );
  }
}

export default RandomPick;
