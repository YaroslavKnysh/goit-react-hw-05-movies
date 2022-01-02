import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as GetApi from './Service';

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
  );
}
