import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import GenreFilter from "./Components/GenreFilter";
import AllMovies from "./Components/AllMovies";
import FavouriteMovies from "./Components/FavouriteMovies";
import RandomFavPick from "./Components/RandomFavPick";
import "./App.css";
import "./Styles/AllMovies.css";
import RandomPick from "./Components/RandomPick";

class App extends Component {
  state = {
    movieData: [],
    haveMovies: false,
    favourites: [],
    filteredFilms: [],
    randomMovie: "",
    randomFavMovie: [],
    genreSelection: ""
  };

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/wildcodeschoolparis/datas/master/movies.json"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ movieData: data, haveMovies: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSelect = event => {
    const genreSelection = event.target.value;
    console.log(genreSelection);
    const filteredFilms = [];
    this.state.movieData.movies.filter(movie => {
      if (movie.genres.includes(genreSelection)) {
        filteredFilms.unshift(movie);
      }
    });
    this.setState({ filteredFilms, genreSelection });
  };

  addFavMovie = favourites => {
    this.setState({ favourites });
  };

  removeFavMovie = favourites => {
    this.setState({ favourites });
  };

  findRandomMovie = () => {
    const movies = this.state.movieData.movies;
    let randomMovie = movies[Math.floor(Math.random() * movies.length)];
    this.setState({ randomMovie });
  };

  findRandomFavMovie = () => {
    let randomFavMovie = this.state.favourites[
      Math.floor(Math.random() * this.state.favourites.length)
    ];
    this.setState({ randomFavMovie });
  };

  render() {
    return (
      <div className="App">
        <nav>
          <Link to="/" className="link home">
            <h1>Home</h1>
          </Link>
          <div className="random-links">
            <Link
              to="/random-pick-movies"
              onClick={() => this.findRandomMovie()}
              className="link random-pick-movies"
            >
              <h1>Random Movie</h1>
            </Link>
            {this.state.favourites.length > 1 ? (
              <Link
                to="/random-pick-fav-movies"
                onClick={() => this.findRandomFavMovie()}
                className="link random-pick-fav-movies"
              >
                <h1>Random Favourite</h1>
              </Link>
            ) : null}
          </div>
        </nav>
        <Switch>
          <Route
            exact
            path="/random-pick-Movies"
            component={() => (
              <RandomPick randomMovie={this.state.randomMovie} />
            )}
          />
          <Route
            exact
            path="/random-pick-Fav-Movies"
            component={() => (
              <RandomFavPick randomFavMovie={this.state.randomFavMovie} />
            )}
          />
          <Route
            exact
            path="/"
            component={() =>
              this.state.favourites.length > 0 ? (
                <div>
                  <br></br>
                  <FavouriteMovies
                    favourites={this.state.favourites}
                    removeFavMovie={this.removeFavMovie}
                  />
                  <h2>All Movies</h2>
                  <GenreFilter
                    movieData={this.state.movieData}
                    handleSelect={this.handleSelect}
                    genreSelection={this.state.genreSelection}
                  />
                  <AllMovies
                    movieData={this.state.movieData}
                    addFavMovie={this.addFavMovie}
                    favourites={this.state.favourites}
                    filteredFilms={this.state.filteredFilms}
                  />
                </div>
              ) : this.state.haveMovies ? (
                <div>
                  <Route
                    exact
                    path="/random-pick-Movies"
                    component={() => (
                      <RandomPick randomMovie={this.state.randomMovie} />
                    )}
                  />
                  <h2>All Movies</h2>
                  <GenreFilter
                    movieData={this.state.movieData}
                    handleSelect={this.handleSelect}
                    genreSelection={this.state.genreSelection}
                  />
                  <AllMovies
                    movieData={this.state.movieData}
                    addFavMovie={this.addFavMovie}
                    favourites={this.state.favourites}
                    filteredFilms={this.state.filteredFilms}
                  />
                </div>
              ) : null
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;
