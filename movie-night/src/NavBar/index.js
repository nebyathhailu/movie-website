import React from "react";
import { useGenres } from "../hooks/useGenres";
import "./style.css";
const NavBar = ({onGenreSelect, selectedGenreId }) => {
  const { genres, loading, error } = useGenres();
  const handleClearGenre = () => {
    onGenreSelect(null, ""); 
  };
  return (
    <nav className="navbar">
      <div className="genre-nav">
        {loading && <span>Loading genres...</span>}
        {error && <span style={{ color: "red" }}>{error}</span>}
        {!loading && !error &&
          genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => onGenreSelect(genre.id, genre.name)}
              className={`genre-btn ${selectedGenreId === genre.id ? "active" : ""}`}
            >
              {genre.name}
            </button>
          ))}
        {selectedGenreId && (
          <button
            onClick={handleClearGenre}
            className="genre-btn clear-btn"
            title="Clear Genre Filter"
          >
            Clear
          </button>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
