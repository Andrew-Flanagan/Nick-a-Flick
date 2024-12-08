import axios from "axios";
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config({ path: "../../.env" }); 
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;


const fetchData = async () => {
  const input_file = "../data/test.txt";
  const output_file = "../data/test.json";
  const format = "movie";
  const req = "https://api.themoviedb.org/3/movie/"
  // const req = "https://api.themoviedb.org/3/search/" + format;
  const dataList = fs.readFileSync(input_file).toString().split("\n");

  for (const data of dataList) {
    const response = await axios.get(
      // req + format,
      req + data,
      {
        params: {
          api_key: TMDB_API_KEY,
          query: data,
        },
      }
    );
    
    if (response.data.results.length > 0) {
      const curr_media = response.data.results[0];

      if (!fs.existsSync(output_file)) {
        fs.writeFileSync(output_file, "[\n");
      }
      fs.appendFileSync(output_file, JSON.stringify(curr_media) + ",\n");
    }
  }
  fs.appendFileSync(output_file, "]");
};

fetchData();