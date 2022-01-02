import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as GetApi from './Service';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  function fetchMovieReviews() {
    setIsLoading(true);

    GetApi.GetApiReviews(movieId)
      .then(response => setReviews(response.data.results))
      .finally(() => setIsLoading(false));
  }
  useEffect(() => {
    fetchMovieReviews();
  }, [movieId]);
  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id}>
          <h3>Author: {review.author}</h3>
          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}
