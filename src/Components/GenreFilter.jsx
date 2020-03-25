import React, { Component } from "react";
import "../Styles/GenreFilter.css";

class GenreFilter extends Component {
  state = {};

  render() {
    const genres = this.props.movieData.genres;
    return (
      <div className="genre-filter-wrapper">
        <label htmlFor="genreFilter">Choose the genre:</label>
        <select
          id="genreFilter"
          className="drop-down"
          onChange={this.props.handleSelect}
          value={this.props.genreSelection}
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
