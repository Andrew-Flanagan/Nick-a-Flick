import axios from "axios";
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config({ path: "../../.env" }); 
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;


const fetchMovies = async () => {
  const input_file = "../data/sorted_list_of_movies.txt";
  const output_file = "../data/movie_data_new.json";
  const movieList = fs.readFileSync(input_file).toString().split("\n");
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
      const movieData = response.data.results[0];

      if (!fs.existsSync(output_file)) {
        fs.writeFileSync(output_file, "[\n");
      }
      fs.appendFileSync(output_file, JSON.stringify(movieData) + ",\n");
    }
  }
  fs.appendFileSync(output_file, "]");
};

fetchMovies();