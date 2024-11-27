import { Box, Button, ButtonGroup, Container, TextField, Typography, InputLabel, MenuItem, FormControl, Select, Menu, Modal } from "@mui/material";
import TableRowsRoundedIcon from '@mui/icons-material/TableRowsRounded';
import ArtTrackRoundedIcon from '@mui/icons-material/ArtTrackRounded';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState, useEffect } from "react";
import PaginationControls from "./PaginationControls.jsx"; // Adjust path as needed
import MovieModal from "./MovieModal.jsx"; // 
import movieList from '../movie_data.json';
import genres from '../genres.json';
import Fuse from "fuse.js";
import "./SearchPage.css";
import { Movie } from "@mui/icons-material";



//to do:
// include run time

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(movieList.slice(0, 25));
  const [totalResults, setTotalResults] = useState(movieList);
  const [displayAsTable, setDisplayAsTable] = useState(false);
  const [sortBy, setSortBy] = useState("Name Ascending");
  const [genre, setGenre] = useState("All");
  const [page, setPage] = useState(1);
  const [numResults, setNumResults] = useState(25);
  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filterMovies = () => {
    const filteredMovieList = movieList.filter((result) => result.genre_ids.includes(genre) || genre === "All");
    if (searchTerm.trim() === "") {
      setSearchResults(filteredMovieList.slice((page-1)*numResults,page*numResults)); // Clear results if no search term
      setTotalResults(filteredMovieList);
      return;
    }
    
    const options = {
      keys: ["original_title"],
      includeScore: true,
      threshold: 0.2,
    };
    const fuse = new Fuse(filteredMovieList, options);
    const searchResults = fuse.search(searchTerm.trim()).map((result) => result.item);

    setPage(1);
    setTotalResults(searchResults);
    setSearchResults(searchResults.slice((page-1)*numResults, page*numResults));
  };
  
  useEffect(() => {
    filterMovies();
  }, [searchTerm, page, numResults, genre]);


  const handleSearchSubmit =  (event) => {
    event.preventDefault();
    filterMovies();
  };

  const toggleList = () => {
    setDisplayAsTable(false);
  }

  const toggleTable = () => {
    setDisplayAsTable(true);
  }


  const sortResults = (criteria, order) => {
    const sortedResults = totalResults.sort((a, b) => {
      if (criteria === "Name") {
        return order === "Ascending"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (criteria === "Year") {
        const yearA = parseInt(a.release_date.substring(0, 4), 10);
        const yearB = parseInt(b.release_date.substring(0, 4), 10);
        return order === "Ascending" ? yearA - yearB : yearB - yearA;
      }
      return 0;
    });
    setSearchResults(sortedResults.slice(0, numResults));
    setTotalResults(sortedResults);
    setSortBy(`${criteria} ${order}`);
  };

  const filterByGenre = (genreId) => {
    if (genreId === "All") {
      setSearchResults(movieList);
      setTotalResults(movieList);
      setGenre(genreId);
      setPage(1);
      return;
    }
    const filteredResults = movieList.filter((result) => result.genre_ids.includes(genreId));
    setGenre(genreId);
    setPage(1);
    setSearchResults(filteredResults.slice(0, numResults));
    setTotalResults(filteredResults);
  }

  const nextPage = () => {
    setPage(page+1);
    setSearchResults(totalResults.slice(page*numResults, (page+1)*numResults));
  }

  const prevPage = () => {
    setPage(page-1);
    setSearchResults(totalResults.slice((page-2)*numResults, (page-1)*numResults));
  }

  const handleOpen = (movie) => {
    setOpen(true);
    setSelectedMovie(movie);
  }

  const handleClose = () => {
    setOpen(false);
    setSelectedMovie(null);
  }

  return (
    <Box sx={{ backgroundColor: "#FEE440", color: "#1A1A1D", py: 8, overflowY: "scroll", minHeight: "100vh"}}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom fontWeight="bold" fontFamily="Press Start 2P">
          Search for movies
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "15px", gap: "1rem"}}>
        <FormControl sx={{width: "100px"}}>
            <InputLabel id="demo-simple-select-label">Genres</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Genres"
              value={genre}
              onChange={(event) => filterByGenre(event.target.value)}
            >
              <MenuItem value={"All"}>All</MenuItem>
              {genres.map((genre) => (<MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>))}
            </Select>
          </FormControl>
          <FormControl sx={{width: "100px"}}>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Sort"
              value={sortBy}
              onChange={(event) => {
                const [criteria, order] = event.target.value.split(" ");
                sortResults(criteria, order);
              }}
            >
              <MenuItem value={"Name Ascending"}>Name Ascending</MenuItem>
              <MenuItem value={"Name Descending"}>Name Descending</MenuItem>
              <MenuItem value={"Year Ascending"}>Year Ascending</MenuItem>
              <MenuItem value={"Year Descending"}>Year Descending</MenuItem>
            </Select>
          </FormControl>
          <ButtonGroup variant="contained" aria-label="Basic button group" size="large" sx={{height: "56px"}}>
            <Button onClick={toggleList} startIcon={<ArtTrackRoundedIcon /> } variant={displayAsTable ? "contained" : "outlined"}> 
              List
            </Button>
            <Button onClick={toggleTable} startIcon={<TableRowsRoundedIcon />} variant={!displayAsTable ? "contained" : "outlined"}>
              Table
            </Button>
          </ButtonGroup>
          <form onSubmit={handleSearchSubmit}>
            <TextField
              id="search-input"
              label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              variant="outlined"
              fullWidth
              sx={{ mr: 1, minWidth: "40vw" }}
            />
          </form>
        </Box>
        <PaginationControls
          page={page}
          totalResults={totalResults}
          numResults={numResults}
          prevPage={prevPage}
          nextPage={nextPage}
          genre={genre}
          genres={genres}
        />
        {displayAsTable ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: "15px", overflow: "scroll", justifyContent: "center", flexDirection: "column"}}>
            <table sx={{margin: "auto", width: "100%", tableLayout: "fixed"}}>
                <thead>
                    <tr>
                      <th style={{textAlign: "left", width: "50%"}}>Name</th>
                      <th style={{textAlign: "left", width: "50%"}}>Genre</th>
                      <th style={{textAlign: "left"}}>Year</th>
                    </tr>
              </thead>
              <tbody>
                {searchResults.map((result) => (
                  <tr key={result.id}>
                    <td>
                      <span className="movie-link" onClick={() => handleOpen(result)}>
                        {result.title}
                      </span>
                    </td>
                    <td> {result.genre_ids.map((genreId) => genres.find(g => g.id === genreId).name).join(", ")} </td>
                    <td> {result.release_date.substring(0, 4)} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        ) : (
          <Box>
            {searchResults.map((result) => (
              <Box key={result.id} sx={{ display: 'flex', alignItems: 'center', gap: 1, marginTop: "15px"}}>
                <img className="movie-poster" src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} alt={`${result.title} Poster`} onClick={() => handleOpen(result)} style={{ cursor: 'pointer' }} />
                <Box>
                  <Typography variant="h5" gutterBottom fontWeight="bold" fontStyle="italic">
                    <span className="movie-link" onClick={() => handleOpen(result)}>
                      {result.title}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Release Date: </strong>{result.release_date.substring(0, 4)}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    <strong>Genre: </strong>{result.genre_ids.map((genreId) => genres.find(g => g.id === genreId).name).join(", ")}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {result.overview}
                  </Typography>
                </Box>
              </Box>
            ))}
            {searchResults.length === 0 ? (<Typography variant="h6" align="center" gutterBottom>No results found.</Typography>) : <PaginationControls
              page={page}
              totalResults={totalResults}
              numResults={numResults}
              prevPage={prevPage}
              nextPage={nextPage}
              genre={genre}
              genres={genres}
            />}
             
          </Box>
        )}
        <MovieModal movie={selectedMovie} open={open} onClose={handleClose} />
      </Container>
    </Box>
  );
};

export default SearchPage;
