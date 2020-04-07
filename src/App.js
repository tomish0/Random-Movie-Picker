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
  constructor(props) {
    super(props);
    this.allMovies =
      JSON.parse(localStorage.getItem("allMovies")) !== null
        ? JSON.parse(localStorage.getItem("allMovies"))
        : [];
    this.genres =
      JSON.parse(localStorage.getItem("genres")) !== null
        ? JSON.parse(localStorage.getItem("genres"))
        : [];
    this.favourites =
      JSON.parse(localStorage.getItem("favourites")) !== null
        ? JSON.parse(localStorage.getItem("favourites"))
        : [];
    this.state = {
      allMovies: this.allMovies,
      genres: this.genres,
      haveMovies: false,
      favourites: this.favourites,
      filteredFilms: [],
      randomMovie: "",
      randomFavMovie: [],
      genreSelection: "",
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/wildcodeschoolparis/datas/master/movies.json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (JSON.parse(localStorage.getItem("allMovies")) === null) {
          localStorage.setItem("allMovies", JSON.stringify(data.movies));
          localStorage.setItem("genres", JSON.stringify(data.genres));
        }
        const allMovies = JSON.parse(localStorage.getItem("allMovies"));
        const genres = JSON.parse(localStorage.getItem("genres"));
        this.setState({ allMovies, genres, haveMovies: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSelect = (event) => {
    let genreSelection = event.target.value;
    const filteredFilms = [];
    let allMovies = this.state.allMovies;
    allMovies.filter((movie) => {
      if (movie.genres.includes(genreSelection)) {
        filteredFilms.unshift(movie);
      }
    });
    this.setState({ filteredFilms, genreSelection });
  };

  addFavMovie = (movie) => {
    const favourites = this.state.favourites;
    const allMovies = this.state.allMovies;
    const filteredFilms = this.state.filteredFilms;
    let allMovieIndex = allMovies.indexOf(movie);
    let filteredFilmsIndex = filteredFilms.indexOf(movie);

    favourites.unshift(movie);
    allMovies.splice(allMovieIndex, 1);
    filteredFilms.splice(filteredFilmsIndex, 1);

    this.setState({ favourites, allMovies });
    localStorage.setItem("favourites", JSON.stringify(favourites));
    localStorage.setItem("allMovies", JSON.stringify(allMovies));
  };

  removeFavMovie = (favourites, favFilm) => {
    const allMovies = this.state.allMovies;
    const filteredFilms = this.state.filteredFilms;
    const genreSelection = this.state.genreSelection
    if (
      genreSelection !== "" &&
      favFilm.genres.includes(genreSelection)
    ) {
      filteredFilms.push(favFilm);
    }
    allMovies.push(favFilm);
    this.setState({ favourites, allMovies, filteredFilms });
    localStorage.setItem("favourites", JSON.stringify(favourites));
    localStorage.setItem("allMovies", JSON.stringify(allMovies));
  };

  findRandomMovie = () => {
    const movies = this.state.allMovies;
    let randomMovie = movies[Math.floor(Math.random() * movies.length)];
    localStorage.removeItem("randomMovie");
    localStorage.setItem("randomMovie", JSON.stringify(randomMovie));
  };

  findRandomFavMovie = () => {
    let randomFavMovie = this.state.favourites[
      Math.floor(Math.random() * this.state.favourites.length)
    ];
    localStorage.removeItem("randomFavMovie");
    localStorage.setItem("randomFavMovie", JSON.stringify(randomFavMovie));
  };

  render() {
    // localStorage.clear();
    console.log(this.state.genreSelection);
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
          {this.state.favourites.length > 1 ? (
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
              this.state.favourites.length > 0 ? (
                <div>
                  <FavouriteMovies
                    favourites={this.state.favourites}
                    removeFavMovie={this.removeFavMovie}
                  />
                  <h2>All Movies</h2>
                  <GenreFilter
                    genres={this.state.genres}
                    handleSelect={this.handleSelect}
                    genreSelection={this.state.genreSelection}
                  />
                  <AllMovies
                    allMovies={this.state.allMovies}
                    addFavMovie={this.addFavMovie}
                    favourites={this.state.favourites}
                    filteredFilms={this.state.filteredFilms}
                    genreSelection={this.state.genreSelection}
                  />
                </div>
              ) : this.state.haveMovies ? (
                <div>
                  <h2>All Movies</h2>
                  <GenreFilter
                    genres={this.state.genres}
                    handleSelect={this.handleSelect}
                    genreSelection={this.state.genreSelection}
                  />
                  <AllMovies
                    allMovies={this.state.allMovies}
                    addFavMovie={this.addFavMovie}
                    favourites={this.state.favourites}
                    filteredFilms={this.state.filteredFilms}
                    genreSelection={this.state.genreSelection}
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
