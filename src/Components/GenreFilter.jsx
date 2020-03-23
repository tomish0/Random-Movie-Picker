import React from "react";
import "../Styles/GenreFilter.css";

const GenreFilter = (props) => {
  const genres = props.movieData.genres;
  return (
    <div>
      <label htmlFor="genreFilter">Choose the genre:</label>
      <select
        id="genreFilter"
        className="drop-down"
        onChange={props.handleSelect}
        value={props.genreSelection}
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

export default GenreFilter;
