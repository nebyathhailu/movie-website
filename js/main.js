import { api_key, trending, base_url , auth } from "./config.js";

// const movieList = document.getElementById('movie-list');

// const trendingMovies = async () => {
//     try {
//         const response = await fetch(`${trending}?api_key=${api_key}`, {
//             method: 'GET',
//             headers: {
//                 "content-type": "application/json",
//                 "Authorization": `${auth}`,
//             }
//         });
//         const result = await response.json();
//         return result;
//     } catch (error) {
//         return new Error(error.message);
//     }
// };

// trendingMovies().then(console.log).catch(console.error);

// const allMovies = async () => {
//     const movies = await trendingMovies();
//     const movieData = Array.isArray(movies?.results) ? movies?.results : [];
//     movieData.forEach(element => {
//         const container = document.createElement('div');
//         const title= document.createElement('h2');
//         const image= document.createElement('img');
//         const description = document.createElement('p');

//         container.appendChild(image);
//         container.appendChild(title);
//         container.appendChild(description);

//         image.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
//         description.textContent = element.overview;
//         title.textContent = element.title;

//         movieList.appendChild(container);
//     });
// };

// allMovies();

const slideshowContainer = document.getElementById("slideshow");
async function fetchTrendingMovies() {
  try {
    const response = await fetch(`${trending}?api_key=${api_key}`,
    {
                     method: 'GET',
                     headers: {
                         "content-type": "application/json",
                         "Authorization": `${auth}`,
                     }
                }
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
  }
}

function createSlide(movie) {
  const slide = document.createElement("div");
  slide.classList.add("slide");
  const img = document.createElement("img");
  img.src = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  img.alt = movie.title;
  const title = document.createElement("div");
  title.classList.add("title");
  title.textContent = movie.title;
  slide.appendChild(img);
  slide.appendChild(title);
  return slide;
}

async function createSlideshow() {
  const movies = await fetchTrendingMovies();
  movies.slice(0, 5).forEach((movie, index) => {
    const slide = createSlide(movie);
    slideshowContainer.appendChild(slide);
  });
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }
  showSlide(currentSlide);
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 4000); // change every 4 seconds
}

createSlideshow();