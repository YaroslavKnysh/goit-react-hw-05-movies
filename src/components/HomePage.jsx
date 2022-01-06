import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as GetApi from './Service';
import s from './style/HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function fetchMovies() {
    setIsLoading(true);

    GetApi.GetApiTranding()
      .then(response => setMovies(response.data.results))
      .finally(() => setIsLoading(false));
  }
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <div className={s.container}>
      <ul className={s.home_movieList}>
        {movies.map(movie => (
          <li key={movie.id} className={s.home_movieItem}>
            <Link to={`/movies/${movie.id}`} className={s.home_movieLink}>
              <img
                className={s.home_movieImg}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
              />
              <p className={s.home_movieTitle}>{movie.original_title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
