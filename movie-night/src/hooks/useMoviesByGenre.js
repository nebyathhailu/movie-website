import { useEffect, useState } from "react";
import { getMoviesByGenre } from "../utils/api";
export const useMoviesByGenre = (genreId) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!genreId) return;
    const fetchGenres = async () => {
      setLoading(true); 
      try {
        const genreMovies = await getMoviesByGenre(genreId);
        setMovies(genreMovies || []);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch genre movies");
      } finally {
        setLoading(false); 
      }
    };
    fetchGenres();
  }, [genreId]);
  return { movies, loading, error };
};

