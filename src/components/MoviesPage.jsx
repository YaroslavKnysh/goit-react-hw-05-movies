import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as GetApi from './Service';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  function fetchMoviesSearch() {
    setIsLoading(true);

    GetApi.GetApiSearch(searchQuery)
      .then(response => setMovies(response.data.results))
      .finally(() => setIsLoading(false));
  }
  function onSubmitForm(e) {
    e.preventDefault();
    setMovies([]);
    fetchMoviesSearch();
  }
  function onSearchInput(e) {
    setSearchQuery(e.target.value);
  }
  return (
    <div>
      <form className="form" onSubmit={onSubmitForm}>
        <button type="submit" className="search-button">
          <span className="button-label">Search</span>
        </button>

        <input
          className="search-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onSearchInput}
        />
      </form>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
              />
              <h3>{movie.original_title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
