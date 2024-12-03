import { useReducer, useMemo } from "react";

const initialState = {
  searchTerm: "",
  genre: "All",
  sortBy: { criteria: "Name", order: "Ascending" },
  page: 1,
  numResults: 25,
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
        return { ...state, displayAsTable: !state.displayAsTable };
    default:
      return state;
  }
};

const useMovies = (movies) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);


  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(state.searchTerm.toLowerCase());
      const matchesGenre =
        state.genre === "All" ||
        movie.genre_ids.includes(state.genre);
      return matchesSearch && matchesGenre;
    });
  }, [state.searchTerm, state.genre, movies]);


  const sortedMovies = useMemo(() => {
    const { criteria, order } = state.sortBy;
    return [...filteredMovies].sort((a, b) => {
      let comparison = 0;
      if (criteria === "Name") {
        comparison = a.title.localeCompare(b.title);
      } else if (criteria === "Year") {
        comparison = new Date(a.release_date) - new Date(b.release_date);
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
