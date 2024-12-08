import fs from 'fs'
import { getReleaseDate, getTitle } from '../helpers/movieHelpers.js';

const outputLetterboxd = () => {
    const input_file = "../data/all_data.json";
    const output_file = "../data/letterboxd_data.csv";
    const dataList = fs.readFileSync(input_file).toString();
    const obj = JSON.parse(dataList);

    if (!fs.existsSync(output_file)) {
        fs.writeFileSync(output_file, "tmdbID,imdbID,Title,Year\n");
    }

    for (const entry of obj) {
        const tmdbID = entry.id;
        const imdbID = entry.imdb_id;
        const title = getTitle(entry);
        const year = getReleaseDate(entry);

        const row = `${tmdbID},${imdbID},${title},${year}\n`;
        fs.appendFileSync(output_file, row);
    }

}

outputLetterboxd();