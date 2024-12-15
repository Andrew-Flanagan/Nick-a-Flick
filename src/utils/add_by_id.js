import axios from "axios";
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config({ path: "../../.env" }); 
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;


const fetchData = async () => {
  const input_file = "../data/ids.txt";
  const output_file = "../data/movie_data.json";
  const dataList = fs.readFileSync(input_file).toString().split("\n");
  
  for (const id of dataList) {
    let req = "https://api.themoviedb.org/3/tv/"
    req += id + "?append_to_response=videos,credits,keywords";
    const response = await axios.get(req,
      {
        params: {
          api_key: TMDB_API_KEY,
          query: req,
        },
      }
    );
    
    const curr_media = response.data;
    if (!fs.existsSync(output_file)) {
      fs.writeFileSync(output_file, "[\n");
    }
    fs.appendFileSync(output_file, JSON.stringify(curr_media) + ",\n");
  }
  fs.appendFileSync(output_file, "]");
};

fetchData();