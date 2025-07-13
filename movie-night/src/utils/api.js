const baseUrl = process.env.REACT_APP_TMDB_BASE_URL;
const apiKey = process.env.REACT_APP_TMDB_API_KEY;
const endPoint = (endpoint) => `${baseUrl}${endpoint}?api_key=${apiKey}`; 

export const getPopularMovies = async (page = 1) => {
    try {
        const response = await fetch (`${endPoint("/movie/popular")}&page=${page}`)
        if (!response){
            throw new Error `Failed to fetch page ${response.status}`;
        }
        const data = await response.json();
        return data?.results;
    }catch(error){
        throw new Error (error.message || "An error occurred")
    }
};

export const searchMoviesData = async (query) => {
    try {
        const response = await fetch (`${endPoint("/search/movie")}&query=${encodeURIComponent(query)}&include_adult=false`)
        if (!response){
            throw new Error `Failed to fetch page ${response.status}`;
        }
        const data = await response.json();
        return data.results.filter(movie => movie.adult === false);
    }catch(error){
        throw new Error (error.message || "An error occurred")
    }
};

export const getUpcomingMovies = async (page = 1) => {
    try {
        const response = await fetch (`${endPoint("/movie/upcoming")}&page=${page}`)
        if (!response){
            throw new Error `Failed to fetch page ${response.status}`;
        }
        const data = await response.json();
        return data?.results;
    }catch(error){
        throw new Error (error.message || "An error occurred")
    }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
    try {
      const response = await fetch(
        `${endPoint("/discover/movie")}&with_genres=${genreId}&page=${page}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch movies by genres: ${response.status}`);
      }
      const data = await response.json();
      return data?.results || [];
    } catch (error) {
      throw new Error(
        error.message || "An error occurred while fetching genre movies"
      );
    }
  };
  

  export const getGenres = async () => {
    try {
      const response = await fetch(
        `${endPoint("/genre/movie/list")}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch genres: ${response.status}`);
      }
      const data = await response.json();
      return data.genres || [];
    } catch (error) {
      throw new Error(error.message || "An error occurred while fetching genres");
    }
  };
  