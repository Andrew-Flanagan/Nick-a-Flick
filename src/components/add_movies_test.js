import axios from "axios";
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config(); 
const TMDB_API_KEY = process.env.TMDB_API_KEY;


const fetchMovies = async () => {
  const movieList = fs.readFileSync("../../list_of_movies.txt").toString().split("\n");
  // console.log(movieList);
  for (const movie of movieList) {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: TMDB_API_KEY,
          query: movie,
        },
      }
    );

    if (response.data.results.length > 0) {
      // console.log(response.data.results[0]);
      const movieData = response.data.results[0];

      if (!fs.existsSync("movie_data.json")) {
        fs.writeFileSync("movie_data.json", "[\n");
      }
      fs.appendFileSync("movie_data.json", JSON.stringify(movieData) + ",\n");
    }
  }
  fs.appendFileSync("movie_data.json", "]");
};

fetchMovies();
