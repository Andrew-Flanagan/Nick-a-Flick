import { useReducer, useMemo } from "react";
import { getTitle, getReleaseDate, getRuntime } from "../helpers/movieHelpers";


const initialState = {
  searchTerm: "",
  genre: "All",
  sortBy: { criteria: "Name", order: "Ascending" },
  page: 1,
  numResults: 50,
  displayAsTable: false,
};

const movieReducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_GENRE":
      return { ...state, genre: action.payload };
    case "SET_SORT":
      return { ...state, sortBy: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "TOGGLE_DISPLAY":
        return { ...state, displayAsTable: action.payload === "table" };
    default:
      return state;
  }
};

const getGenreIds = (movie) => {
  return movie.genres.map((genre) => genre.id)
}

const normalizeText = (text) => text.toLowerCase().replace(/[^a-z0-9]/g, "");


const useMovies = (movies) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);


  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const normTitle = normalizeText(getTitle(movie));
      const normSearchTerm = normalizeText(state.searchTerm);
      const matchesSearch = normTitle
        .includes(normSearchTerm);
      const matchesGenre =
        state.genre === "All" ||
        getGenreIds(movie).includes(state.genre);
      return matchesSearch && matchesGenre;
    });
  }, [state.searchTerm, state.genre, movies]);


  const sortedMovies = useMemo(() => {
    const { criteria, order } = state.sortBy;
    return [...filteredMovies].sort((a, b) => {
      let comparison = 0;
      switch (criteria) {
        case "Name":
          comparison = getTitle(a).localeCompare(getTitle(b));
          break;
        case "Year":
          comparison = new Date(getReleaseDate(a)) - new Date(getReleaseDate(b));
          break;
        case "Popularity":
          comparison = a.popularity - b.popularity;
          break;
        case "Runtime":
          comparison = getRuntime(a) - getRuntime(b);
          break;
        case "Rating":
          comparison = a.vote_average - b.vote_average;
          break;
        default:
          comparison = 0;
          break;
      }
      return order === "Ascending" ? comparison : -comparison;
    });
  }, [filteredMovies, state.sortBy]);


  const paginatedMovies = useMemo(() => {
    const start = (state.page - 1) * state.numResults;
    const end = start + state.numResults;
    return sortedMovies.slice(start, end);
  }, [sortedMovies, state.page, state.numResults]);

  const totalResults = filteredMovies.length;

  return {
    state,
    dispatch,
    paginatedMovies,
    filteredMovies,
    totalResults,
  };
};

export { useMovies };
