import axios from "axios";
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config({ path: "../../.env" }); 
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;


const fetchData = async () => {
  const input_file = "../data/tv_data.json";
  const output_file = "../data/updated_tv_data.json";
  const req = "https://api.themoviedb.org/3/tv/"
  const dataList = fs.readFileSync(input_file).toString();
  const obj = JSON.parse(dataList);

  for (const entry of obj) {
    const response = await axios.get(
      req + entry.id,
      {
        params: {
          api_key: TMDB_API_KEY,
          query: entry.id,
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