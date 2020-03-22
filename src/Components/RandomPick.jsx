import React, { Component } from "react";

class RandomPick extends Component {
  state = {};
  render() {
    return <div>{this.props.randomFilm ? `Your random film: ${this.props.randomFilm}` :  "If your Favourite Movies list is empty, you can't randomly pick a movie!?"}</div>;
  }
}

export default RandomPick;
