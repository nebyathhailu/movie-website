import './style.css';
import { useState } from 'react';
import { usePopularMovies } from '../hooks/usePopularMovies';
import { useMoviesByGenre } from '../hooks/useMoviesByGenre';
import { useWatchlist } from '../context/WatchlistContext';
import { useGenres } from '../hooks/useGenres';
import SearchMovies from '../SearchMovies';
import NavBar from '../NavBar';
import { FaHeart } from 'react-icons/fa';
import VideoHero from '../VideoHero';
import { MovieSlider } from '../MovieSlide/index';

export const MoviePage = () => {
  const { watchlist, toggleWatchlist } = useWatchlist();
  const { genres, loading: genreLoading, error: genreError } = useGenres();
  const isInWatchlist = (movie) => watchlist.some((m) => m.id === movie.id);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [selectedGenreName, setSelectedGenreName] = useState('');
  const handleWatchlistToggle = () => {
    setShowWatchlist(true);
    setSelectedGenreId(null);
    setSelectedGenreName('');
  };
  const handleGenreSelection = (genreId, genreName) => {
    setSelectedGenreId(genreId);
    setSelectedGenreName(genreName);
    setShowWatchlist(false);
  };
  const { loading: popularLoading, error: popularError, movies: popularMovies } = usePopularMovies();
  const { movies: genreMovies = [], loading: genreMoviesLoading, error: genreMoviesError } = useMoviesByGenre(selectedGenreId);
  const displayedMovies = showWatchlist ? watchlist : selectedGenreId ? genreMovies : popularMovies;
  const loading = showWatchlist ? false : selectedGenreId ? genreMoviesLoading : popularLoading;
  const error = showWatchlist ? null : selectedGenreId ? genreMoviesError : popularError;
  return (
    <div>
      <VideoHero
        title={"Movie Explorer"}
        children={
          <NavBar
            onGenreSelect={handleGenreSelection}
            selectedGenreId={selectedGenreId}
          />
        }
      />
      <SearchMovies
        showWatchlist={showWatchlist}
        onWatchlistClick={handleWatchlistToggle}
      />
      {/* Show Watchlist or Genre Movies below search */}
      {(showWatchlist || selectedGenreId) && (
        <div className="dynamic-results">
          <h2 className="movie-section-title">
            {showWatchlist
              ? 'Your Watchlist'
              : selectedGenreName
              ? `${selectedGenreName}`
              : ''}
          </h2>
          <button
            onClick={() => {
              setShowWatchlist(false);
              setSelectedGenreId(null);
              setSelectedGenreName('');
            }}
            className="back-button"
          >
            ← Home
          </button>
          {loading && <h2>Loading...</h2>}
          {error && <h2 style={{ color: 'red' }}>{error}</h2>}
          <div className="movie-grid">
            {displayedMovies.map((movie) => (
              <div className="profile" key={movie.id}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Image'
                  }
                  alt={`${movie.title} poster`}
                />
                <div className="title-container">
                  <h3 className="movie-title">{movie.title}</h3>
                  <button
                    onClick={() => toggleWatchlist(movie)}
                    className="heart-icon"
                    aria-label="Toggle Watchlist"
                    title="Toggle Watchlist"
                  >
                    <FaHeart color={isInWatchlist(movie) ? '#5367bb' : '#686869'} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Keep MovieSlider and Popular Movies always visible */}
      <div className="movie-slider">
        <MovieSlider />
      </div>
    </div>
  );  
};