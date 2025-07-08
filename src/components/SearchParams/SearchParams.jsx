import React from "react";
import { Box, Button, ButtonGroup, TextField, FormControl, Select, MenuItem, Typography } from "@mui/material";
import TableRowsRoundedIcon from "@mui/icons-material/TableRowsRounded";
import ViewCompactIcon from '@mui/icons-material/ViewCompact';
import genres from "../../data/genres.json";
import { styled } from '@mui/system';
import theme from "../../styles/theme";
import "./SearchParams.css";


const SearchParams = ({ state, onDisplayChange, onGenreChange, onSearchChange, onSortChange, onResetFilters }) => {

  const CustomButton = styled(Button)({
    width: '2rem',
    height: '2rem',
    alignItems: 'center',
    display: "flex",
    padding: 0,
    justifyContent: 'center',
  });

  const checkFilters = () => {
    if (state.genre === "All" && state.sortBy.criteria === "Name" && state.sortBy.order === "Ascending" && state.searchTerm === "") {
      return false;
    }
    return true;
  };
  

    return (
    <Box>
      <Button
        onClick={onResetFilters}
        sx={{
          display: checkFilters() ? "block" : "none",
          marginLeft: "auto",
          marginBottom: "0.5rem",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.secondary.main
        }}
        >Remove Filters/Sorting
      </Button>
      <Box className="search-box">
        <FormControl sx={{ width: "auto" }}>
          <Select
            labelId="genre-select-label"
            id="genre-select"
            label="Genres"
            value={state.genre}
            onChange={onGenreChange}
            variant="standard"
            sx={{ borderRadius: "5px", overflow: "auto" }}
            defaultValue={"All"}
          >
            <MenuItem value={"All"}>Any Genre</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
            </FormControl>
            <Typography variant="body" sx={{marginRight: "-0.8rem", padding: "4px 0px 6px 0px"}}>Sort:</Typography>
            <FormControl sx={{ width: "auto" }}>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                label="Sort"
                value={`${state.sortBy.criteria} ${state.sortBy.order}`}
                onChange={onSortChange}
                variant="standard"
              >
                <MenuItem value={"Name Ascending"}>Name A-Z</MenuItem>
                <MenuItem value={"Name Descending"}>Name Z-A</MenuItem>
                <MenuItem value={"Year Ascending"}>Oldest First</MenuItem>
                <MenuItem value={"Year Descending"}>Newest First</MenuItem>
                <MenuItem value={"Popularity Descending"}>Popularity High-Low</MenuItem>
                <MenuItem value={"Popularity Ascending"}>Popularity Low-High</MenuItem>
                <MenuItem value={"Runtime Descending"}>Longest First</MenuItem>
                <MenuItem value={"Runtime Ascending"}>Shortest First</MenuItem>
                <MenuItem value={"Rating Descending"}>Rating High-Low</MenuItem>
                <MenuItem value={"Rating Ascending"}>Rating Low-High</MenuItem>
              </Select>
            </FormControl>
              <ButtonGroup
              variant="contained"
              aria-label="Display options"
              >
                <CustomButton
                    value="grid"
                    id="grid-button"
                    onClick={onDisplayChange}
                    startIcon={<ViewCompactIcon sx={{marginRight: "-8px"}} />}
                    variant={state.displayAsTable ? "outlined" : "contained"}
                    size="small"
                    sx = {{borderRadius: "4px"}}
                >
                </CustomButton>
                <CustomButton
                    value="table"
                    id="table-button"
                    onClick={onDisplayChange}
                    startIcon={<TableRowsRoundedIcon sx={{marginRight: "-8px"}}/>}
                    variant={state.displayAsTable ? "contained" : "outlined"}
                    size="small"
                    sx={{borderRadius: "4px"}}
                >
                </CustomButton>
              </ButtonGroup>
        </Box>
        <TextField
            id="search-input"
            label="Search"
            value={state.searchTerm}
            onChange={onSearchChange}
            variant="outlined"
            fullWidth
          />
      </Box>
    );
};

export default SearchParams;