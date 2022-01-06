import React, { lazy, Suspense } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
const HomePage = lazy(() => import('./components/HomePage'));
const MoviePage = lazy(() => import('./components/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./components/MovieDetailsPage'));
const Cast = lazy(() => import('./components/Cast'));
const Reviews = lazy(() => import('./components/Reviews'));

function App() {
  return (
    <div>
      <header className="header">
        <nav>
          <NavLink className="navLink_home" exact="true" to="/">
            Home
          </NavLink>
          <NavLink className="navLink_movies" to="/movies">
            Movies
          </NavLink>
        </nav>
      </header>
      <div className="App">
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" exact="true" element={<HomePage />} />
            <Route path="/movies" element={<MoviePage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="/movies/:movieId/cast" element={<Cast />} />
              <Route path="/movies/:movieId/reviews" element={<Reviews />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
