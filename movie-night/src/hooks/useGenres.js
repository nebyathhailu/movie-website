import { useEffect, useState } from "react";
import { getGenres } from "../utils/api";
export const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genreList = await getGenres(); // This fetches all genres
        setGenres(genreList || []);
      } catch (err) {
        setError(err.message || "Failed to fetch genres");
      } finally {
        setLoading(false);
      }
    };
    fetchGenres();
  }, []);
  return { genres, loading, error };
};