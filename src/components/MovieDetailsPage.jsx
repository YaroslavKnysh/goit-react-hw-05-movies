import React, { useState, useEffect } from 'react';
import {
  NavLink,
  useParams,
  Outlet,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import * as GetApi from './Service';
import s from './style/MovieDetails.module.css';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();
  const navi = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname ?? '/';

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
      <div>
        <button onClick={() => navi(fromPage)}>Back</button>
      </div>

      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt=""
      />
      <h3>{movie.original_title}</h3>
      <p>Overview: {movie.overview}</p>
      <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
      <a href={`${movie.homepage}`}>Movie Homepage</a>
      <div className={s.movieDetails_linkContainer}>
        <NavLink
          className={s.movieDetails_link_cast}
          to={`/movies/${movie.id}/cast`}
          state={{ from: location.state.from }}
        >
          Cast
        </NavLink>
        <NavLink
          className={s.movieDetails_link_reviews}
          to={`/movies/${movie.id}/reviews`}
          state={{ from: location.state.from }}
        >
          Reviews
        </NavLink>
      </div>
      <Outlet />
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
