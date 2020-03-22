import React, { Component } from "react";
// import GenreFilter from "./Components/GenreFilter";
import Movie from "./Components/Movie";
import "./App.css";

class App extends Component {
  state = {
    movieData: [],
    haveMovies: false
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
        console.log(this.state.movieData);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        {this.state.haveMovies ? (
          <div>
            {/* <GenreFilter movieData={this.state.movieData} /> */}
            <Movie movieData={this.state.movieData} />
          </div>
        ) : null}
      </div>
    );
  }
}

export default App;
