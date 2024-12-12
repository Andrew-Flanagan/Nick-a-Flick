import axios from "axios";
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config({ path: "../../.env" }); 
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;


const fetchData = async () => {
  const input_file = "../data/all_data.json";
  const output_file = "../data/updated_data.json";
  const movie_req = "https://api.themoviedb.org/3/movie/";
  const tv_req = "https://api.themoviedb.org/3/tv/";
  const dataList = fs.readFileSync(input_file).toString();
  const obj = JSON.parse(dataList);

  for (const entry of obj) {
    let req = entry.title ? movie_req + entry.id : tv_req + entry.id;
    req += "?append_to_response=videos,credits,keywords";
    const response = await axios.get(req, {
      params: {
        api_key: TMDB_API_KEY,
        query: req,
      },
    });
    
    const curr_media = response.data;
    if (!fs.existsSync(output_file)) {
      fs.writeFileSync(output_file, "[\n");
    }
    fs.appendFileSync(output_file, JSON.stringify(curr_media) + ",\n");
  }
  fs.appendFileSync(output_file, "]");
};

fetchData();