import React, { useState } from "react";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { FaHeart } from "react-icons/fa";
import './style.css'

const SearchMovies = ({ onWatchlistClick, showWatchlist, }) => {
  const [query, setQuery] = useState("");
  const { movies, loading, error } = useSearchMovies(query);
  return (
    <div style={{ padding: "1rem" }}>
      <div className="search-component">
      <input
        type="text"
        placeholder="Search movies..."
        className="search-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        
      />
      <button
        className="watchlist-btn"
        onClick={() => {
          if (!showWatchlist) onWatchlistClick();
        }}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer"
        }}
        aria-label="Show Watchlist"
        title={showWatchlist ? "Currently in Watchlist" : "Show Watchlist"}
      >
        <FaHeart size={30} color={showWatchlist ?'#5367bb' : '#fdcb6e'} />
      </button>
      </div>
        
      {loading && <p>Searching...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && movies.length === 0 && query && <p>No results found.</p>}
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                  : "https://via.placeholder.com/200x300?text=No+Image"
              }
              alt={movie.title}
              style={{ width: "100px", marginRight: "10px" }}
            />
            <h4>{movie.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default SearchMovies;