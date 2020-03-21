import React, { Component } from "react";
import Movie from "./Components/Movie";

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
        console.log(data);
        this.setState({ movieData: data,
        haveMovies: true });
        console.log(this.state.movieData);
      })
      .catch(err => {
        console.log(err);
      }); 
  }

  render() {
    return (
      <div>
        {this.state.haveMovies ? <Movie movieData={this.state.movieData} /> : null}
      </div>
    );
  }
}

export default App;
