import axios from 'axios';

const API_KEY = '3e9f7d765351a9c26eb28cc077430d06';

export function GetApiTranding() {
  return axios.get(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
  );
}

export function GetApiSearch(searchQuery) {
  return axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`,
  );
}

export function GetApiDetails(movieId) {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  );
}

export function GetApiCast(movieId) {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  );
}

export function GetApiReviews(movieId) {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  );
}
