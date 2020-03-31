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
  // state = {
  //   movieData: [],
  //   haveMovies: false,
  //   favourites: [],
  //   filteredFilms: [],
  //   randomMovie: "",
  //   randomFavMovie: [],
  //   genreSelection: ""
  // };

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = {
      movieData: [],
      haveMovies: false,
      favourites: [],
      filteredFilms: [],
      randomMovie: "",
      randomFavMovie: [],
      genreSelection: ""
    };
  }

  componentDidMount() {
    console.log("mounted");
    fetch(
      "https://raw.githubusercontent.com/wildcodeschoolparis/datas/master/movies.json"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ movieData: data, haveMovies: true });
        localStorage.setItem("movieData", JSON.stringify(data));
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

  addFavMovie = movie => {
    let favourites =
      JSON.parse(localStorage.getItem("favourites")) !== null
        ? JSON.parse(localStorage.getItem("favourites"))
        : this.state.favourites;
    let id = movie.id;
    if (favourites.some(movie => movie.id === id)) {
      alert(`${movie.title} is already a Favourite Movie!`);
    } else {
      favourites.unshift(movie);
    }
    this.setState({ favourites });
    localStorage.setItem("favourites", JSON.stringify(favourites));
  };

  removeFavMovie = favourites => {
    this.setState({ favourites });
    // localStorage.removeItem("favourites");
    localStorage.setItem("favourites", JSON.stringify(favourites));
  };

  findRandomMovie = () => {
    const movies = JSON.parse(localStorage.getItem("movieData")).movies;
    let randomMovie = movies[Math.floor(Math.random() * movies.length)];
    localStorage.removeItem("randomMovie");
    localStorage.setItem("randomMovie", JSON.stringify(randomMovie));
  };

  findRandomFavMovie = () => {
    let randomFavMovie = JSON.parse(localStorage.getItem("favourites"))[
      Math.floor(
        Math.random() * JSON.parse(localStorage.getItem("favourites")).length
      )
    ];
    localStorage.removeItem("randomFavMovie");
    localStorage.setItem("randomFavMovie", JSON.stringify(randomFavMovie));
  };

  render() {
    // localStorage.clear();
    const favourites =
      JSON.parse(localStorage.getItem("favourites")) !== null
        ? JSON.parse(localStorage.getItem("favourites"))
        : this.state.favourites;
    const movieData =
      JSON.parse(localStorage.getItem("movieData")) !== null
        ? JSON.parse(localStorage.getItem("movieData"))
        : this.state.movieData;

    console.log(favourites, favourites.length, this.state.favourites);
    console.log(
      this.state.movieData,
      JSON.parse(localStorage.getItem("movieData"))
    );
    return (
      <div className="App">
        <nav>
          <Link to="/" className="link home">
            <h1>Home</h1>
          </Link>
          <Link
            to="/random-pick-movies"
            onClick={() => this.findRandomMovie()}
            className="link random-pick-movies"
          >
            <h1>Random Movie</h1>
          </Link>
          {favourites.length > 1 ? (
            <Link
              to="/random-pick-fav-movies"
              onClick={() => this.findRandomFavMovie()}
              className="link random-pick-fav-movies"
            >
              <h1>Random Favourite</h1>
            </Link>
          ) : null}
        </nav>
        <Switch>
          <Route
            exact
            path="/random-pick-Movies"
            component={() => (
              <RandomPick
                randomMovie={JSON.parse(localStorage.getItem("randomMovie"))}
              />
            )}
          />
          <Route
            exact
            path="/random-pick-Fav-Movies"
            component={() => (
              <RandomFavPick
                randomFavMovie={JSON.parse(
                  localStorage.getItem("randomFavMovie")
                )}
              />
            )}
          />
          <Route
            exact
            path="/"
            component={() =>
              favourites.length > 0 ? (
                <div>
                  <FavouriteMovies
                    favourites={favourites}
                    removeFavMovie={this.removeFavMovie}
                  />
                  <h2>All Movies</h2>
                  <GenreFilter
                    movieData={movieData}
                    handleSelect={this.handleSelect}
                    genreSelection={this.state.genreSelection}
                  />
                  <AllMovies
                    movieData={movieData}
                    addFavMovie={this.addFavMovie}
                    favourites={favourites}
                    filteredFilms={this.state.filteredFilms}
                  />
                </div>
              ) : this.state.haveMovies ? (
                <div>
                  <h2>All Movies</h2>
                  <GenreFilter
                    movieData={movieData}
                    handleSelect={this.handleSelect}
                    genreSelection={this.state.genreSelection}
                  />
                  <AllMovies
                    movieData={movieData}
                    addFavMovie={this.addFavMovie}
                    favourites={favourites}
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
