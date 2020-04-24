import React, { Component } from "react";
import "../Styles/GenreFilter.css";

class GenreFilter extends Component {
  render() {
    // select list to create drop down of genres
    // onChange calls handleSelect function in App
    const genres = this.props.genres;
    return (
      <div className="genre-filter-wrapper">
        <label htmlFor="genreFilter">Choose the genre:</label>
        <select
          id="genreFilter"
          className="drop-down"
          onChange={this.props.handleSelect}
          value={this.props.genreSelection}
        >
          <option className="drop-down-value" value="All">
            All
          </option>
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
