// import axios from "axios";
// import fs from 'fs'
// import dotenv from 'dotenv'


// dotenv.config({ path: "../../.env" }); 
// const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;



// const addOneMovie = async (movieTitle) => {
//     const output_file = "../data/movie_data_new.json";
//     var prom = prompt("Enter the movie title: ");

//     const response = await axios.get(
//         "https://api.themoviedb.org/3/search/movie",
//         {
//         params: {
//             api_key: TMDB_API_KEY,
//             query: movieTitle,
//         },
//         }
//     );
// }

// addOneMovie();