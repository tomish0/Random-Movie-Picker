import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import testImage from "./testImage";
import GenreFilter from "./Components/GenreFilter";
import AllMovies from "./Components/AllMovies";
import FavouriteMovies from "./Components/FavouriteMovies";
import RandomFavPick from "./Components/RandomFavPick";
import RandomPick from "./Components/RandomPick";
import "./App.css";
import "./Styles/AllMovies.css";
import "./Styles/media-queries.css";

class App extends Component {
  // Constructor used to either start the app with the local storage data or empty arrays
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
      allMovies: this.allMovies, // array of all the movies accessed from the api
      genres: this.genres, // array of all the genres accessed from the api
      favourites: this.favourites, // array of the chosen favourite movies
      filteredFilms: [], // array of movies after filter occurs
      randomMovie: {}, // single movie object chosen randomly from allMovies array
      randomFavMovie: {}, // single movie object chosen randomly from favourites array
      genreSelection: "", // the genre selected upon filter
      noMoreFilteredFilms: false,
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
        console.log(data.movies);
        var newMoviesList = []; // array to hold all movies that have a valid image link
        // intially check if you already have allMovies in your local storage
        // if you don't (initial load of app) then perform asynchronous Promise task of checking
        // if each movie's image is valid with testImage from "./testImage.js"
        if (JSON.parse(localStorage.getItem("allMovies")) === null) {
          data.movies.forEach((movie) => {
            testImage(movie.posterUrl).then(
              function fulfilled() {
                // valid image link so put movie into newMoviesList
                newMoviesList.push(movie);
                // call finish function
                finish();
              },
              function rejected() {
                // non-valid image link so ignore
                // call finish function
                finish();
              }
            );
          });
          var waiting = data.movies.length; // used to handle finish of asynchronous task
          // finish is called to remove 1 each time from waiting
          // once waiting goes to 0 meaning you have looped through all the movies
          // & performed the asynchronous task on each
          // then you can call your addToState function & add the new movies list to the state
          const finish = () => {
            waiting--;
            if (waiting === 0) {
              addToState(newMoviesList);
            }
          };
          // function called to add movies & genres to local storage & then state
          const addToState = (newMoviesList) => {
            // remove any genres that no movies in your new array includes
            // add this new genres array to the state, meaning all your options 
            // in the dropdown genres menu will have associated movies  
            var validGenres = [];
            data.genres.forEach((genre) => {
              newMoviesList.forEach((movie) => {
                if (
                  movie.genres.includes(genre) &&
                  !validGenres.includes(genre)
                ) {
                  validGenres.push(genre);
                }
              });
            });
            localStorage.setItem("allMovies", JSON.stringify(newMoviesList));
            localStorage.setItem("genres", JSON.stringify(validGenres));
            const allMovies = JSON.parse(localStorage.getItem("allMovies"));
            const genres = JSON.parse(localStorage.getItem("genres"));
            this.setState({ allMovies, genres });
          };
        } else {
          // allMovies already stored in localStorage so get & add to state
          const allMovies = JSON.parse(localStorage.getItem("allMovies"));
          const genres = JSON.parse(localStorage.getItem("genres"));
          this.setState({ allMovies, genres });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleSelect = (event) => {
    // handling onChange event of genreSelection in GenreFilter.jsx
    // allMovies is filtered to produce only movies with genres that include the selection
    // filtered movies are put into this.state.filteredFilms array
    let genreSelection = event.target.value;
    const filteredFilms = [];
    this.state.allMovies.filter((movie) => {
      if (movie.genres.includes(genreSelection)) {
        filteredFilms.unshift(movie);
      }
      return null;
    });
    this.setState({ filteredFilms, genreSelection });
  };

  addFavMovie = (movie) => {
    // movie object received from allMovies button onCLick
    // find index of movie in allMovies & filteredFilms to splice from respective arrays upon adding
    // put new movie into favourites array
    const { allMovies, favourites, filteredFilms } = this.state;
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
    // if the genre isn't empty (when the app starts the filter starts on 'All', which isn't a genre from API)
    // and the favFilm's genres does not include the genreSelection
    // then put the favFilm into filteredFilms array
    // conditonal solves issue of removing from favourites and showing instantaneously if in a filter
    // put the favFilm back into the allMovies array
    const { allMovies, filteredFilms, genreSelection } = this.state;
    if (genreSelection !== "" && favFilm.genres.includes(genreSelection)) {
      filteredFilms.push(favFilm);
    }
    allMovies.push(favFilm);
    this.setState({ favourites, allMovies, filteredFilms });
    localStorage.setItem("favourites", JSON.stringify(favourites));
    localStorage.setItem("allMovies", JSON.stringify(allMovies));
  };

  findRandomMovie = () => {
    // find a random movie from allMovies array
    let randomMovie = this.state.allMovies[
      Math.floor(Math.random() * this.state.allMovies.length)
    ];
    localStorage.removeItem("randomMovie");
    localStorage.setItem("randomMovie", JSON.stringify(randomMovie));
  };

  findRandomFavMovie = () => {
    // find a random movie from favourites array
    let randomFavMovie = this.state.favourites[
      Math.floor(Math.random() * this.state.favourites.length)
    ];
    localStorage.removeItem("randomFavMovie");
    localStorage.setItem("randomFavMovie", JSON.stringify(randomFavMovie));
  };

  render() {
    return (
      <div className="App">
        <nav>
          <div className="home">
            <Link to="/" className="link home-link">
              <h1>HOME</h1>
            </Link>
          </div>
          <div className="random-picks">
            <Link
              to="/random-pick-movies"
              onClick={() => this.findRandomMovie()}
              className="link random-pick-movies"
            >
              <h1>Random</h1>
              <h1>Movie</h1>
            </Link>
            {this.state.favourites.length > 1 ? (
              <Link
                to="/random-pick-fav-movies"
                onClick={() => this.findRandomFavMovie()}
                className="link random-pick-fav-movies"
              >
                <h1>Random</h1>
                <h1>Favourite</h1>
              </Link>
            ) : null}
          </div>
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
              ) : this.state.allMovies.length > 0 ? (
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
