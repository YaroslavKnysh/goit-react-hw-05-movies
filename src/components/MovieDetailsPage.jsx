import React, { useState, useEffect } from 'react';
import { NavLink, useParams, Outlet } from 'react-router-dom';
import * as GetApi from './Service';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  function fetchMovieCard() {
    setIsLoading(true);

    GetApi.GetApiDetails(movieId)
      .then(response => setMovie(response.data))
      .finally(() => setIsLoading(false));
  }
  useEffect(() => {
    fetchMovieCard();
  }, [movieId]);

  return movie ? (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt=""
      />
      <h3>{movie.original_title}</h3>
      <p>Overview: {movie.overview}</p>
      <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
      <a href={`${movie.homepage}`}>Movie Homepage</a>
      <div>
        <NavLink to={`/movies/${movie.id}/cast`}>Cast</NavLink>
        <NavLink to={`/movies/${movie.id}/reviews`}>Reviews</NavLink>
      </div>
      <Outlet />
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
