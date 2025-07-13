import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import "./style.css"; 
import { useUpcomingMovies } from '../hooks/useUpcomingMovies';

export const MovieSlider = () => {
  const settings = {
    infinite: true,
    autoplay:true,
    autoplaySpeed:100,
    speed:2000,
    slidesToShow: 4,  
    slidesToScroll: 1,
    cssEase:"ease-in-out",
    pauseOnHover:true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  const { loading, error, movies } = useUpcomingMovies();
  if (loading) return <h2>Loading....</h2>;
  if (error) return <h1>Error: {error}</h1>;
  return (
    <div style={{ padding: "1rem" }} className='slider'>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="slide-item">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
              className='movie-poster'
            />
            <h4 style={{ textAlign: "center", marginTop: "0.5rem" }}>
              {movie.title}
            </h4>
          </div>
        ))}
      </Slider>
    </div>
  );
};