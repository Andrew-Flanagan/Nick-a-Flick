import {
    Box,
    Container,
    Typography,
  } from "@mui/material";
import PaginationControls from "../../components/PaginationControls/PaginationControls.jsx"; // Adjust path as needed
import SearchParams from "../../components/SearchParams/SearchParams.jsx";
import { useMovies } from "../../hooks/useMovies"; // Assuming you separated the hook and reducer
import { getTitle, getGenres, getReleaseDate } from "../../helpers/movieHelpers";
import movieList from "../../data/all_data.json";
import "./SearchPage.css";
import genres from "../../data/genres.json";
import staff_picks from "../../data/staff_picks.json";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import MovieGrid from "../../components/MovieGrid/MovieGrid.jsx";
import { useModal } from "../../hooks/useModal.jsx";
import { ModalProvider } from "../../hooks/useModal.jsx";

  
  const SearchPage = () => {
    const {
      state,
      dispatch,
      paginatedMovies,
      totalResults,
    } = useMovies(movieList);
  
    const { openModal } = useModal();
  
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
      <ModalProvider>
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
                          onClick={() => openModal(result)}
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
              <MovieGrid media={paginatedMovies} handleOpen={openModal} />
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
        </Container>
      </Box>
      </ModalProvider>
    );
  };
  
  export default SearchPage;
  