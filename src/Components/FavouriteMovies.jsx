import React, { Component } from "react";
import RandomPick from "./RandomPick";
import { Route, Link, Switch } from "react-router-dom";

class FavouriteMovies extends Component {
  state = {
    favourites: []
  };

  findRandomFilm = () => {
    const favourites = this.state.favourites;
    let randomFilm = favourites[Math.floor(Math.random() * favourites.length)];
    return randomFilm;
  };
  
  render() {
    const favourites = this.state.favourites;
    return (
      <div>
        <div>
          <br />
          <Link to="/">Home</Link>
          <h1>Favourite Movies</h1>
          <Link to="/random-pick" onClick={() => this.findRandomFilm()}>
            Pick A Random Movie From Your Favourites
          </Link>
          {favourites.map((favFilm, i) => {
            return (
              <div className="movie-wrapper" key={i}>
                <div className="each-movie">{favFilm}</div>
                <button
                  onClick={() => {
                    let favourites = [...this.state.favourites];
                    favourites.splice([i], 1);
                    this.setState({ favourites });
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <Switch>
          <Route
            exact
            path="/random-pick"
            component={() => <RandomPick randomFilm={this.findRandomFilm()} />}
          />
          <Route exact path="/" />
        </Switch>
      </div>
    );
  }
}

export default FavouriteMovies;
