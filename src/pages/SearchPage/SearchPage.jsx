import { useState } from "react";
import {
    Box,
    Container,
    Typography,
  } from "@mui/material";
import PaginationControls from "../../components/PaginationControls/PaginationControls.jsx"; // Adjust path as needed
import MovieModal from "../../components/MovieModal/MovieModal.jsx";
import SearchParams from "../../components/SearchParams/SearchParams.jsx";
import { useMovies } from "../../hooks/useMovies"; // Assuming you separated the hook and reducer
import { getTitle, getGenres, getReleaseDate } from "../../helpers/movieHelpers";
import movieList from "../../data/all_data.json";
import "./SearchPage.css";
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid2';
import placeholder_poster from "../../assets/images/Nick_a_flick.jpeg";
import genres from "../../data/genres.json";
import staff_picks from "../../data/staff_picks.json";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";

  
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
      window.scrollTo(0, 500);

    };

    const handleDisplayChange = (e) => {
      dispatch({ type: "TOGGLE_DISPLAY", payload: e.currentTarget.value });
    };

    const handleOpen = (movie) => {
      setOpen(true);
      setSelectedMovie(movie);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedMovie(null);
    };

    const handleResetFilters = () => {
      dispatch({ type: "SET_SEARCH_TERM", payload: "" });
      dispatch({ type: "SET_GENRE", payload: "All" });
      dispatch({ type: "SET_SORT", payload: { criteria: "Name", order: "Ascending" } });
      dispatch({ type: "SET_PAGE", payload: 1 });
    };

    const getGenreName = (genreId) => {
      const genre = genres.find((genre) => genre.id === genreId);
      return genre ? genre.name : "";
    }

  
    return (
      <Box
        sx={{
          overflowY: "scroll",
          minHeight: "100vh",
        }}
      >
        <MovieCarousel title="" data={staff_picks} subTitle="Staff Pick"/>
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            fontWeight="bold"
            fontFamily="Press Start 2P"
            sx={{ paddingTop: "1rem" }}
          >
            Search From {totalResults} {getGenreName(state.genre)} Movies and TV
          </Typography>
          <SearchParams
          state={state}
          onSearchChange={handleSearchChange}
          onGenreChange={handleGenreChange}
          onSortChange={handleSortChange}
          onDisplayChange={handleDisplayChange}
          onResetFilters={handleResetFilters}
          />
          <PaginationControls
            page={state.page}
            totalResults={totalResults}
            numResults={state.numResults}
            onPageChange={handlePageChange}
          />
          {state.displayAsTable ? (
            <Box
              sx={{
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
              <PaginationControls
                page={state.page}
                totalResults={totalResults}
                numResults={state.numResults}
                onPageChange={handlePageChange}
                style={{ marginTop: "15px" }}
              />
            </Box>
          ) : (
            <Box>
                <Grid container spacing={1.5} justifyContent="center">
                {paginatedMovies.map((result) => (
                  <Grid
                    className="movie-item"
                    size={2.4}
                    key={result.id} 
                    xs={3}   // 4 items per row on mobile (12 / 3 = 4)
                    sm={3}   // 4 items per row on small screens
                    md={2.4} // 5 items per row on medium screens
                    lg={2.4} // 5 items per row on large screens (adjust for the desired width)
                    xl={2}   // 6 items per row on extra-large screens (adjust if needed)
                    sx={{
                    }}
              
                  >
                    <Tooltip 
                      title={
                        <Typography fontSize={"1.5em"} textAlign={"center"}>
                          {getTitle(result)}
                        </Typography>
                      } 
                      placement="top" 
                      className="tool-tip"
                    >
                      <img
                        className="movie-poster"
                        src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                        alt={getTitle(result) + "poster"}
                        onError={(e) => { e.target.src = placeholder_poster }}
                        onClick={() => handleOpen(result)}
                      />
                    </Tooltip>
                  </Grid>
                ))}
              </Grid>
              {paginatedMovies.length === 0 && (
                <Typography variant="h6" align="center" gutterBottom>
                  No results found.
                </Typography>
              )}
              <PaginationControls
                page={state.page}
                totalResults={totalResults}
                numResults={state.numResults}
                onPageChange={handlePageChange}
                style={{ marginTop: "15px" }}
              />
            </Box>
          )}
          <MovieModal movie={selectedMovie} open={open} onClose={handleClose} />
        </Container>
      </Box>
    );
  };
  
  export default SearchPage;
  