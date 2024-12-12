import {
    Box,
    Container,
    Typography,
  } from "@mui/material";
import PaginationControls from "../../components/PaginationControls/PaginationControls.jsx"; // Adjust path as needed
import SearchParams from "../../components/SearchParams/SearchParams.jsx";
import { useMovies } from "../../hooks/useMovies"; // Assuming you separated the hook and reducer
import movieList from "../../data/updated_data.json";
import "./SearchPage.css";
import genres from "../../data/genres.json";
import staff_picks from "../../data/staff_picks.json";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import MovieGrid from "../../components/MovieGrid/MovieGrid.jsx";
import { ModalProvider } from "../../hooks/useModal.jsx";
import MediaTable from "../../components/MediaTable/MediaTable.jsx";
  
  const SearchPage = () => {
    const {
      state,
      dispatch,
      paginatedMovies,
      totalResults,
    } = useMovies(movieList);
  
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
            <Box>
            <MediaTable media={paginatedMovies} />
            </Box>
          ) : (
            <Box>
              <MovieGrid media={paginatedMovies} />
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
            style={{ marginTop: "15px" }}
          />
        </Container>
      </Box>
      </ModalProvider>
    );
  };
  
  export default SearchPage;
  