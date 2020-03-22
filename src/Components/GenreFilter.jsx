import React, { Component } from "react";
import "../Styles/GenreFilter.css";

class GenreFilter extends Component {
  state = {
    filteredFilms: []
  };

  handleSelect = event => {
    const genreSelection = event.target.value;
    const filteredFilms = [];
    this.props.movieData.movies.filter(movie => {
      if (movie.genres.includes(genreSelection)) {
        filteredFilms.unshift(movie);
      }
    });
    this.setState({ filteredFilms });
    console.log(this.state.filteredFilms);
  };

  render() {
    const genres = this.props.movieData.genres;
    return (
      <div>
        <label htmlFor="genreFilter">Choose the genre:</label>
        <select
          id="genreFilter"
          className="drop-down"
          onChange={this.handleSelect}
        >
          <option value="All">All</option>
          {genres.map((genre, i) => {
            return (
              <option value={genre} key={i}>
                {genre}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}

export default GenreFilter;
