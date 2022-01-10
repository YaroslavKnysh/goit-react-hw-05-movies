import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as GetApi from './Service';
import s from './style/MoviePage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

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
  const search = new URLSearchParams(location.search).get('query');

  console.log(search);

  useEffect(() => {
    if (search) {
      fetchMoviesSearch(search);
    }
  }, []);

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={onSubmitForm}>
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
      <ul className={s.home_movieList}>
        {movies.map(movie => (
          <li key={movie.id} className={s.home_movieItem}>
            <Link
              to={`/movies/${movie.id}`}
              state={{
                from: location,
              }}
            >
              <img
                className={s.home_movieImg}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
              />
              <p>{movie.original_title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
