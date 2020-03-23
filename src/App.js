import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import GenreFilter from "./Components/GenreFilter";
import AllMovies from "./Components/AllMovies";
import FavouriteMovies from "./Components/FavouriteMovies";
import RandomFavPick from "./Components/RandomFavPick";
import "./App.css";
import RandomPick from "./Components/RandomPick";

class App extends Component {
  state = {
    movieData: [],
    haveMovies: false,
    favourites: [],
    filteredFilms: [],
    randomMovie: "",
    randomFavMovie: "",
    genreSelection: ''
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
    this.setState({ randomMovie: randomMovie.title });
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
        <Link to="/">Home</Link>
        <br></br>
        <Link to="/random-pick-Movies" onClick={() => this.findRandomMovie()}>
          Pick A Random Movie
        </Link>

        {this.state.favourites.length > 0 ? (
          <div>
            {this.state.favourites.length > 1 ? (
              <Link
                to="/random-pick-Fav-Movies"
                onClick={() => this.findRandomFavMovie()}
              >
                Pick A Random Movie From Your Favourites
              </Link>
            ) : null}
            <br></br>
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
            <FavouriteMovies
              favourites={this.state.favourites}
              removeFavMovie={this.removeFavMovie}
            />
            <h1>All Movies</h1>
            <GenreFilter
              movieData={this.state.movieData}
              handleSelect={this.handleSelect}
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
            <h1>All Movies</h1>
            <GenreFilter
              movieData={this.state.movieData}
              handleSelect={this.handleSelect}
            />
            <AllMovies
              movieData={this.state.movieData}
              addFavMovie={this.addFavMovie}
              favourites={this.state.favourites}
              filteredFilms={this.state.filteredFilms}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
