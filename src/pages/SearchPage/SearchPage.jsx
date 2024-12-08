import { useState } from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Container,
    TextField,
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
  } from "@mui/material";
  import TableRowsRoundedIcon from "@mui/icons-material/TableRowsRounded";
  import ArtTrackRoundedIcon from "@mui/icons-material/ArtTrackRounded";
  import PaginationControls from "../../components/PaginationControls/PaginationControls.jsx"; // Adjust path as needed
  import MovieModal from "../../components/MovieModal/MovieModal.jsx";
  import { useMovies } from "../../hooks/useMovies"; // Assuming you separated the hook and reducer
  import movieList from "../../data/movie_data.json";
  import genres from "../../data/genres.json";
  import "./SearchPage.css";
  
  const SearchPage = () => {
    const {
      state,
      dispatch,
      paginatedMovies,
      totalResults,
    } = useMovies(movieList);
  
    const [open, setOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
  
    const handleSearchChange = (event) => {
      dispatch({ type: "SET_SEARCH_TERM", payload: event.target.value });
      dispatch({ type: "SET_PAGE", payload: 1 });
    };
  
    const handleGenreChange = (event) => {
      dispatch({ type: "SET_GENRE", payload: event.target.value });
      dispatch({ type: "SET_PAGE", payload: 1 });
    };
  
    const handleSortChange = (event) => {
      const [criteria, order] = event.target.value.split(" ");
      dispatch({ type: "SET_SORT", payload: { criteria, order } });
      dispatch({ type: "SET_PAGE", payload: 1 });
    };
  
    const handlePageChange = (newPage) => {
      dispatch({ type: "SET_PAGE", payload: newPage });
    };

    const handleDisplayChange = () => {
        dispatch({ type: "TOGGLE_DISPLAY" });
    };

    const handleOpen = (movie) => {
      setOpen(true);
      setSelectedMovie(movie);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedMovie(null);
    };

    const getReleaseDate = (movie) => {
        if (movie.release_date === undefined) {
            return movie.first_air_date.substring(0, 4);
        }
        return movie.release_date.substring(0, 4);
    }

    const getTitle = (movie) => {
        if (movie.title === undefined) {
            return movie.name;
        }
        return movie.title;
    }

    const getGenres = (movie) => {
      return movie.genres.map((genre) => genre.name).join(", ")
    }

  
    return (
      <Box
        sx={{
          backgroundColor: "#FEE440",
          color: "#1A1A1D",
          py: 8,
          overflowY: "scroll",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            fontWeight="bold"
            fontFamily="Press Start 2P"
          >
            Search for movies and television
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "15px",
              gap: "1rem",
            }}
          >
            <FormControl sx={{ width: "100px" }}>
              <InputLabel id="genre-select-label">Genres</InputLabel>
              <Select
                labelId="genre-select-label"
                id="genre-select"
                label="Genres"
                value={state.genre}
                onChange={handleGenreChange}
              >
                <MenuItem value={"All"}>All</MenuItem>
                {genres.map((genre) => (
                  <MenuItem key={genre.id} value={genre.id}>
                    {genre.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: "100px" }}>
              <InputLabel id="sort-select-label">Sort</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                label="Sort"
                value={`${state.sortBy.criteria} ${state.sortBy.order}`}
                onChange={handleSortChange}
              >
                <MenuItem value={"Name Ascending"}>Name Ascending</MenuItem>
                <MenuItem value={"Name Descending"}>Name Descending</MenuItem>
                <MenuItem value={"Year Ascending"}>Year Ascending</MenuItem>
                <MenuItem value={"Year Descending"}>Year Descending</MenuItem>
              </Select>
            </FormControl>
            <ButtonGroup
              variant="contained"
              aria-label="Display options"
              size="large"
              sx={{ height: "56px" }}
            >
              <Button
                onClick={handleDisplayChange}
                startIcon={<ArtTrackRoundedIcon />}
                variant={state.displayAsTable ? "contained" : "outlined"}
              >
                List
              </Button>
              <Button
                onClick={handleDisplayChange}
                startIcon={<TableRowsRoundedIcon />}
                variant={!state.displayAsTable ? "contained" : "outlined"}
              >
                Table
              </Button>
            </ButtonGroup>
            <TextField
              id="search-input"
              label="Search"
              value={state.searchTerm}
              onChange={handleSearchChange}
              variant="outlined"
              fullWidth
              sx={{ mr: 1, minWidth: "40vw" }}
            />
          </Box>
          <PaginationControls
            page={state.page}
            totalResults={totalResults}
            numResults={state.numResults}
            onPageChange={handlePageChange}
          />
          {state.displayAsTable ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                marginTop: "15px",
                overflow: "scroll",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <table
                sx={{
                  margin: "auto",
                  width: "100%",
                  tableLayout: "fixed",
                }}
              >
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", width: "50%" }}>Name</th>
                    <th style={{ textAlign: "left", width: "50%" }}>Genre</th>
                    <th style={{ textAlign: "left" }}>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMovies.map((result) => (
                    <tr key={result.id}>
                      <td>
                        <span
                          className="movie-link"
                          onClick={() => handleOpen(result)}
                        >
                          {getTitle(result)}
                        </span>
                      </td>
                      <td>
                        {getGenres(result)}
                      </td>
                      <td>{getReleaseDate(result)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          ) : (
            <Box>
              {paginatedMovies.map((result) => (
                <Box
                  key={result.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    marginTop: "15px",
                  }}
                >
                  <img
                    className="movie-poster"
                    src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                    alt={`${getTitle(result)} Poster`}
                    onClick={() => handleOpen(result)}
                    style={{ cursor: "pointer" }}
                  />
                  <Box>
                    <Typography
                      variant="h5"
                      gutterBottom
                      fontWeight="bold"
                      fontStyle="italic"
                    >
                      <span
                        className="movie-link"
                        onClick={() => handleOpen(result)}
                      >
                        {getTitle(result)}
                      </span>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Release Date: </strong>
                      {getReleaseDate(result)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Genre: </strong>
                      {getGenres(result)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {result.overview}
                    </Typography>
                  </Box>
                </Box>
              ))}
              {paginatedMovies.length === 0 && (
                <Typography variant="h6" align="center" gutterBottom>
                  No results found.
                </Typography>
              )}
            </Box>
          )}
          <PaginationControls
            page={state.page}
            totalResults={totalResults}
            numResults={state.numResults}
            onPageChange={handlePageChange}
          />
          <MovieModal movie={selectedMovie} open={open} onClose={handleClose} />
        </Container>
      </Box>
    );
  };
  
  export default SearchPage;
  