import { useEffect, useState } from "react";
import { searchMoviesData } from "../utils/api";

export const useSearchMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setMovies([]);
        return;
      }
      try {
        setLoading(true);
        const results = await searchMoviesData(query);
        setMovies(results);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [query]);
  return { movies, loading, error };
};












