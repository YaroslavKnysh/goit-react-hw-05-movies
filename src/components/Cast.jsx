import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as GetApi from './Service';

export default function Cast() {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  function fetchMovieCast() {
    setIsLoading(true);

    GetApi.GetApiCast(movieId)
      .then(response => setCast(response.data.cast))
      .finally(() => setIsLoading(false));
  }
  useEffect(() => {
    fetchMovieCast();
  }, [movieId]);
  return (
    <ul>
      {cast.map(actor => (
        <li key={actor.id}>
          <p>{actor.name}</p>
          {actor.profile_path === null ? (
            <p>Ooops, no photo</p>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt=""
            />
          )}
        </li>
      ))}
    </ul>
  );
}
